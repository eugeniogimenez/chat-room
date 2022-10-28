import { rtdb } from "./rtdb";
import { ref, onValue } from "firebase/database";

import { Router } from "@vaadin/router";

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

  init() {
    console.log("Soy state.init()");

    // SI NO HAY NOMBRE O EMAIL EN EL STATE, VUELVE A LA HOME PAGE
    const currentState = this.getState();
    if (currentState.nombre == null || currentState.email == null) {
      Router.go("/");
    }

    //avisa los cambios en la rtdb
    // const lastStorageState = localStorage.getItem("state");

    console.log("state: ", this.getState());
  },

  listenRoom() {
    console.log("soy state.listenRoom");

    const currentState = this.getState();
    const chatRoomsRef = ref(rtdb, "/rooms/" + currentState.rtdbRoomId);

    //Con onValue escucho los cambios en la rtdb
    onValue(chatRoomsRef, (snapshot) => {
      const messagesFromServer = snapshot.val();
      // console.log("messagesFromServer: ", messagesFromServer);

      const messagesList = _.map(messagesFromServer.messages);
      currentState.messages = messagesList;
      console.log("messagesList: ", messagesList);

      this.setState(currentState);
    });
  },

  getState() {
    return this.data;
  },

  //Setea el nombre en el State
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

  //setea el email en el state
  setEmail(email: string) {
    console.log("soy state.setEmail");

    const currentState = this.getState();
    currentState.email = email;

    //Le seteo toda la data nueva
    this.setState(currentState);
  },

  //Crea un usuario y devuelve su id
  //le paso email y name.
  createNewUser(newUserData) {
    return fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUserData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
        console.log("createNewUser data: ", data);
      });
  },

  //Crea un nuevo Room poniendo al usuario como owner (dueño)
  createNewRoom(userId) {
    return fetch(API_BASE_URL + "/rooms", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userId),
    })
      .then((res) => {
        return res.json();
      })
      .then((finalres) => {
        return finalres;
        console.log("createNewRoom finalres: ", finalres);
      });
  },

  //Setea el RoomId Corto en el State
  setRoomId(roomId: string) {
    console.log("state.setRoomId: ", roomId);

    const currentState = this.getState();
    currentState.firestereRoomId = roomId;
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
  connectToRoom(roomIdFacil, firestoreUserId) {
    console.log("soy state.connectToRoom");

    return fetch(
      API_BASE_URL + "/rooms/" + roomIdFacil + "?userId=" + firestoreUserId
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
        console.log("data en connectToRoom: ", data);
      });
  },

  subscribe(callback: (any) => any) {
    console.log("soy state.subscribe()");

    this.listeners.push(callback);
  },
};

export { state };
