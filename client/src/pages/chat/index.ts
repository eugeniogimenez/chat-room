customElements.define(
  "chat-page",
  class chatPage extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
              <header-comp></header-comp>
              <h1>Soy chat</h1>
          `;
      //   this.innerText = "soy chat-page";
    }
  }
);
