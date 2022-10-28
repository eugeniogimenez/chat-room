// class RoomsFormComponent extends HTMLElement {
//   constructor() {
//     super();
//     this.render();
//   }
//   render() {
//     this.innerHTML = `
//       <form class='room-form'>
//           <div>
//             <label class='label'>
//                 <h3>room</h3>
//                 <select class='input' name="opciones">
//                   <option class="subtitle" value="1">Nuevo Room</option>
//                   <option class="subtitle" value="2">Room Existente</option>
//                 </select>
//             </label>
//           </div>
//           <div>
//               <label class='label-roomId-new'>
//                   <span>room id</span>
//                   <input class='input-label-roomId' name="input" type="text">
//               </label>
//           </div>
//           <button-comp class='text_button'>Comenzar</button-comp>
//       </form>
//         `;

//     const labelRoom = this.querySelector(".label-roomId-new");
//     const selectEl = this.querySelector(".input");
//     selectEl?.addEventListener("change", (e) => {
//       e.preventDefault();

//       const target = e.target as HTMLSelectElement;
//       const value = target.value;

//       if (value == "2") {
//         labelRoom?.classList.remove("label-roomId-new");
//         labelRoom?.classList.add("label-roomId");
//       } else {
//         labelRoom?.classList.remove("label-roomId");
//         labelRoom?.classList.add("label-roomId-new");
//       }
//     });

//     const style = document.createElement("style");
//     style.innerHTML = `
//             .room-form {
//                 display: flex;
//                 flex-direction: column;
//             }

//             .label {
//               display: flex;
//               flex-direction: column;
//               margin-bottom: 13px;
//             }

//             .label-roomId-new {
//               display: none;
//               flex-direction: column;
//               margin-bottom: 13px;
//             }

//             .label-roomId {
//               display: flex;
//               flex-direction: column;
//               margin-bottom: 13px;
//             }

//             .input-label-roomId {
//               height: 55px;
//               min-width: 312px;
//               border: 2px solid #000000;
//               border-radius: 4px;
//             }
//         `;

//     this.appendChild(style);
//   }
// }

// customElements.define("rooms-form", RoomsFormComponent);
