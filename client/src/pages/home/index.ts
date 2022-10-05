customElements.define(
  "home-page",
  class HomePage extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
            <header-comp></header-comp>
            
            <section class='section-home'>
              <h1 class='h1-home'>
                <text-comp class='title'>Bienvenidos</text-comp>
              </h1>

              <div class='div-home'>
                <div class='div-home-registration'>
                  <registration-form class='subtitle registration'></registration-form>
                </div>
                <div class='div-home-rooms'>
                  <rooms-form class='subtitle'></rooms-form>
                </div>
                <button-comp class='text_button'>Comenzar</button-comp>
              </div>
            </section>
        `;
    }
  }
);
