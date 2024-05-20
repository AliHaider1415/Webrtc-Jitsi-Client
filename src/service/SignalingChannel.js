class SignalingChannel {
  constructor(url, onOpen, onMessage, onClose) {
    this.url = url;
    this.onOpen = onOpen;
    this.onMessage = onMessage;
    this.onClose = onClose;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("Connected to the room");
      if (typeof this.onOpen === "function") {
        this.onOpen();
      }
    };

    this.socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      if (typeof this.onMessage === "function") {
        this.onMessage(JSON.parse(event.data));
      }
    };

    this.socket.onclose = () => {
      console.log("Disconnected from the room");
      if (typeof this.onClose === "function") {
        this.onClose();
      }
    };
  }

  send(message) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket not open. Unable to send message.");
    }
  }

  addEventListener(event, handler) {
    this.socket.addEventListener(event, handler);
  }

  removeEventListener(event, handler) {
    this.socket.removeEventListener(event, handler);
  }
}
