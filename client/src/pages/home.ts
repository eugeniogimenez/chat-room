import { state } from "../state";

customElements.define(
  "home-page",
  class HomePage extends HTMLElement {
    connectedCallback() {
      this.render();
      this.addListeners();
    }

    //ADDLISTENERS
    addListeners() {
      console.log("Home.addListeners");

      //ESCUCHO EL FORMULARIO
      const form = this.querySelector(".registration-form");
      form?.addEventListener("submit", (e: any) => {
        e.preventDefault();

        const nombre = e.target.nombre.value;
        const email = e.target.email.value;
        const roomSelect = e.target.opciones.value;

        //1.Si EL USUARIO QUIERE UN NUEVO ROOM (newRoom):
        if (roomSelect == "newRoom") {
          //PRIMERO VERIFICA QUE ESTEN COMPLETOS LOS CAMPOS DE EMAIL/NOMBRE
          //(Si el email y el nombre son desiguales a un string vacio,
          //quiere decir que están completos).
          if (email.trim() !== "" && nombre.trim() !== "") {
            state.setNombre(nombre);
            state.setEmail(email);

            const newRoomData = {
              email,
              nombre,
            };

            //guardo el usuario en la db
            const newUserPromise = state.createNewUser(newRoomData);

            newUserPromise.then((res) => {
              //Si el email ingresado ya existe, arroja una advertencia
              if (res.message) {
                alert(res.message);
              }

              //Si el usuario se crea correctamente
              //se crea una nueva Room con su Id
              if (res.id) {
                const userId = {
                  userId: res.id,
                };

                const newRoomPromise = state.createNewRoom(userId);
                const newUserId = res.id;

                //Si la Room se crea correctamente, se define el ID en el State
                newRoomPromise.then((res) => {
                  if (res.id) {
                    const newRoomId = res.id;
                    state.setRoomId(newRoomId);

                    //Se hace un get para poder adquirir el id largo de la room
                    const getRoomPromise = state.connectToRoom(
                      newRoomId,
                      newUserId
                    );

                    getRoomPromise.then((res) => {
                      //AQUI
                    });
                  }
                });
              }
            });
          }
        }
        //2.EL USUARIO QUIERE UN ROOM EXISTENTE ('newRoom')
        if (roomSelect == "actualRoom") {
        } else {
        }
      });
    }
    //FIN ADDLISTENERS

    render() {
      this.innerHTML = `
            <header-comp></header-comp>
            
            <section class='section-home'>
              <h1 class='h1-home'>
                <text-comp class='title'>Bienvenidos</text-comp>
              </h1>

              <form class='registration-form subtitle'>
              
                <div>
                    <label class='label'>
                        <span>email</span>
                        <input class='input' name="email" type="email">
                    </label>
                </div>
                <div>
                    <label class='label'>
                        <span>nombre</span>
                        <input class='input' name="nombre" type="text">
                    </label>
                </div>
              
                <div>
                  <label class='label'>
                      <h3>room</h3>
                      <select class='inputRoom input' name="opciones">
                        <option class="subtitle" value="newRoom">Nuevo Room</option>
                        <option class="subtitle" value="actualRoom">Room Existente</option>
                      </select>
                  </label>
                </div>
                <div>
                  <label id='labelRoom' class='label-roomId-new'>
                      <span>room id</span>
                      <input class='input-label-roomId' name="input" type="text">
                  </label>
                </div>
                
                <button-comp class='text_button'>Comenzar</button-comp>
              </form>
                
             

            </section>
        `;

      //Al seleccionar "room existente" despliega un input para ingresar "room id"
      //caso contrario no lo muestra
      const labelRoom = this.querySelector(".label-roomId-new");
      const selectEl = this.querySelector(".inputRoom");
      selectEl?.addEventListener("change", (e) => {
        e.preventDefault();

        const target = e.target as HTMLSelectElement;
        const value = target.value;

        if (value == "actualRoom") {
          labelRoom?.classList.remove("label-roomId-new");
          labelRoom?.classList.add("label-roomId");
        } else {
          labelRoom?.classList.remove("label-roomId");
          labelRoom?.classList.add("label-roomId-new");
        }
      });

      //Estilos de la page Home
      const style = document.createElement("style");
      style.innerHTML = `
          .section-home{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        
          .h1-home{
              height: 55px;
              min-width: 312px;
          }

          //Estilos del form
          .room-form {
            display: flex;
            flex-direction: column;
          }

          .label {
            display: flex;
            flex-direction: column;
            margin-bottom: 13px;
          }

          .label-roomId-new {
            display: none;
            flex-direction: column;
            margin-bottom: 13px;
          }

          .label-roomId {
            display: flex;
            flex-direction: column;
            margin-bottom: 13px;
          }

          .input-label-roomId {
            height: 55px;
            min-width: 312px;
            border: 2px solid #000000;
            border-radius: 4px;
          }

          .registration-form {
            display: flex;
            flex-direction: column;
          }

          .label {
            display: flex;
            flex-direction: column;
            
          }

          .input {
            height: 55px;
            min-width: 312px;
            border: 2px solid #000000;
            border-radius: 4px;
          }

        `;

      this.appendChild(style);
    }
  }
);
