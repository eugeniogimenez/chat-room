class RoomsFormComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = `
      <form class='form'>
        <div>
            <label class='label'>
                <span>room</span>
                <input class='input' name="email" type="email">
            </label>
        </div>
        <div>
            <label class='label'>
                <span>room id</span>
                <select class='input' name="opciones">
                  <option class="subtitle" value="1">Nuevo Room</option>
                  <option class="subtitle" value="2">Room Existente</option>
                </select>
            </label>
        </div>
        
      </form>
        `;

    const style = document.createElement("style");
    style.innerHTML = `
            .form {
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
            }
        `;

    this.appendChild(style);
  }
}

customElements.define("rooms-form", RoomsFormComponent);
