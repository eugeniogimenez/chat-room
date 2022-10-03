import { state } from "./state";
import "./router";

//components
import "./components/header/";

//pages
import "./pages/home/index";
import "./pages/chat/index";

(function () {
  console.log("soy main");

  state.init();

  //Esto sucede en el submit del form de la primera pantalla
  state.setEmailAndFullName("marce@apx.school", "Marce");

  //creo mi usuario
  state.signIn((err) => {
    if (err) console.error("hubo un error");

    //creo un room
    state.askNewRoom(() => {
      state.accessToRoom(); //para que se ejecute accesToRoom despues que askNewRoom se lo paso por callback
    });
  });

  //propuesta para evitar la primera pantalla
  // //al comenzar
  // state.init();

  // //recupera el State del loacalStorage
  // const currentState = state.getState();

  // if (currentState.rtdbRoomId && currentState.firestoreUserId) {
  //   router.push("/chat");
  // }
})();
