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

              <registration-form class='subtitle registration'></registration-form>
                
              <rooms-form class='subtitle'></rooms-form>
                
             

            </section>
        `;

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
        `;

      this.appendChild(style);
    }
  }
);
