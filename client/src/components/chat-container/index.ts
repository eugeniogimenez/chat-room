import { state } from "../../state";

type Message = {
  from: string;
  message: string;
};

class ChatComponent extends HTMLElement {
  messages: Message[] = [];

  constructor() {
    super();
    this.render();

    state.subscribe(() => {
      const currentState = state.getState();
      this.messages = currentState.messages;
      console.log("this.messages en ChatComponent: ", currentState.messages);
    });
  }
  render() {
    this.innerHTML = `
        <div class="chat-container">${this.messages}</div>
          `;

    const style = document.createElement("style");
    style.innerHTML = `
              .chat-container{
                  border: 2px solid #000000;
                  border-radius: 4px;
                  height: 320px;
                  min-width: 312px;
                  margin-bottom: 12px;
              }
              
          `;

    this.appendChild(style);
  }
}

customElements.define("chat-container", ChatComponent);
