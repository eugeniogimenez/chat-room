customElements.define(
  "chat-page",
  class chatPage extends HTMLElement {
    constructor() {
      super();

      this.render();
    }

    render() {
      this.innerHTML = `
              <header-comp></header-comp>
              <h1>Hola 2</h1>
          `;
      this.innerText = "soy chat-page";
    }
  }
);
