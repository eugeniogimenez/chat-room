class RegistrationFormComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = `
    <form class='form'>
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
            border: 2px solid #000000;
            border-radius: 4px;
          }
      `;

    this.appendChild(style);
  }
}

customElements.define("registration-form", RegistrationFormComponent);
