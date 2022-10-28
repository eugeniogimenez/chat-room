customElements.define(
  "chat-page",
  class ChatPage extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
            <header-comp></header-comp>
            
            <section class='section-home'>
              <h1 class='chat-home'>
                <text-comp class='title'>Chat</text-comp>
              </h1>

              <h3 class='chat-home'>
                <text-comp class='subtitle'>room id: AXFTR1</text-comp>
              </h3>

              <chat-container></chat-container>

              <form>
                <input class='input' type="text">
                <button-comp class='text_button'>Enviar</button-comp>
              </form>
                

            </section>
        `;

      const style = document.createElement("style");
      style.innerHTML = `
          .section-home{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        
          .chat-home{
              min-width: 312px;
          }

          .input {
            height: 55px;
            min-width: 312px;
            border: 2px solid #000000;
            border-radius: 4px;
            margin-bottom: 12px;
          }
        `;

      this.appendChild(style);
    }
  }
);
