class Header extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="header"></div>
    `;

    this.innerText = "Hola, soy Header";

    const style = document.createElement("style");
    style.innerHTML = `
        .header {
            border: solid;
            height: 60px;
            width: 375px;
            background-color: #FF8282;
        }
    `;

    this.appendChild(style);
  }
}

customElements.define("header-comp", Header);
