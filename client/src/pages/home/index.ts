customElements.define(
  "home-page",
  class HomePage extends HTMLElement {
    constructor() {
      super();

      this.render();
    }

    render() {
      const div = document.createElement("div");
      div.innerHTML = `
            <header-comp></header-comp>
            <h1>Hola 2</h1>
        `;
      this.innerText = "soy home-page";
    }
  }
);
