import { rtdb } from "./rtdb";
import { ref, onValue } from "firebase/database";

import _ from "lodash";

const API_BASE_URL = "http://localhost:3000";

const state = {
  data: {
    email: "",
    firestoreUserId: "",
    firestoreRoomId: "", //id sencillo
    fullName: "",
    messages: [],
    rtdbRoomId: "",
  },

  listeners: [],

  //avisa los cambios en la rtdb
  init() {
    console.log("Soy state.init()");

    const lastStorageState = localStorage.getItem("state");
  },

  listenRoom() {
    console.log("soy state.listenRoom");

    const currentState = this.getState();
    const chatRoomsRef = ref(rtdb, "/rooms/" + currentState.rtdbRoomId);
    console.log("chatRoomsRef: ", chatRoomsRef);

    //Con onValue escucho los cambios en la rtdb
    onValue(chatRoomsRef, (snapshot) => {
      const messagesFromServer = snapshot.val();
      // console.log("messagesFromServer: ", messagesFromServer);

      const messagesList = _.map(messagesFromServer.messages);
      currentState.messages = messagesList;

      this.setState(currentState);
    });
  },

  getState() {
    return this.data;
  },

  setNombre(nombre: string) {
    console.log(
      "Soy state.setNombre(nombre), y el nombre recibido es: ",
      nombre
    );

    const currentState = this.getState(); // = data
    currentState.nombre = nombre; // = data.nombre

    //piso el nombre que tenía con el nombre recibido
    this.setState(currentState);
  },

  //Le manda al Backend el mensaje nuevo
  //La rtdb
  //Mezclo un dato nuevo, el message, con un dato que tenia: nombre.
  pushMessage(message: string) {
    console.log("soy state.pushMessage(message), y mi mensaje es: ", message);

    const nombreQueGuardeEnElState = this.data.nombre;
    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: nombreQueGuardeEnElState,
        message: message,
      }),
    });
  },
  ///

  setEmailAndFullName(email: string, fullName: string) {
    console.log("soy setEmailAndFullName");

    const currentState = this.getState();
    currentState.fullName = fullName;
    currentState.email = email;

    //Le seteo toda la data nueva
    this.setState(currentState);
  },

  setState(newState) {
    this.data = newState;

    for (const i of this.listeners) {
      i();
    }

    localStorage.setItem("state", JSON.stringify(newState));
    console.log("Soy state.setState(newState) y mi newState es: ", newState);
  },

  signIn(callback?) {
    console.log("soy state.signIn()");

    const currentState = this.getState();

    if (currentState.email) {
      //si el State tiene el email que se quiere crear la cuenta,
      //osea, que ya tiene cuenta, hacemos un fetch.
      //fetch: buscar
      fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: currentState.email,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("firestoreUserId en signIn: ", data);

          currentState.firestoreUserId = data.firestoreUserId;
          this.setState(currentState);

          if (callback) {
            callback();
          }
        });
    } else {
      console.error("No hay email en el state");
      callback(true);
    }
  },

  //El state le pide al servidor un nuevo room
  //Pide un nuevo roomId y lo guarda en el State
  askNewRoom(callback?) {
    //el ? hace al callback opcional
    console.log("soy state.askNewRoom");

    const currentState = this.getState();

    if (currentState.firestoreUserId) {
      //invocamos a la API
      fetch(API_BASE_URL + "/rooms/", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: currentState.firestoreUserId,
        }),
      })
        .then((res) => {
          //Parseamos la respuesta a json (porque sino es un texto)
          return res.json();
        })
        .then((data) => {
          console.log("data en askNewRoom: ", data);

          //guardamos el nuevo roomId en el State
          currentState.firestoreRoomId = data.id;
          this.setState(currentState);

          if (callback) callback();
        });
    } else {
      console.error("No hay firestoreUserId");
    }
  },

  //Con el firestereRoomId que nos pasa askNewRoom() funciona ésta funcion
  accessToRoom(callback?) {
    console.log("soy state.accessToRoom");

    const currentState = this.getState();
    // const rtdbRoomId = currentState.rtdbRoomId;
    const roomIdFacil = currentState.firestoreRoomId;
    console.log("roomIdFacil", roomIdFacil);

    fetch(
      API_BASE_URL +
        "/rooms/" +
        roomIdFacil +
        "?userId=" +
        currentState.firestoreUserId
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("rtdbRoomId en accessToRoom: ", data);

        currentState.rtdbRoomId = data.rtdbRoomId;
        this.setState(currentState);
        this.listenRoom();

        callback?.callback();
      });
  },

  subscribe(callback: (any) => any) {
    console.log("soy state.subscribe() y mi callback es: ", callback);

    this.listeners.push(callback);
  },
};

export { state };
