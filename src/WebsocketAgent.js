'use strict';

export default class WebsocketAgent {
  constructor(url) {
    this.handlers = [];
    this.promiseResolvers = [];
    this.promiseRejecters = [];
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      let parsedEvent = JSON.parse(event.data);

      if (parsedEvent.id !== undefined) {
        if (parsedEvent.body !== null) {
          this.promiseResolvers[parsedEvent.id](parsedEvent.body);
        } else {
          this.promiseRejecters[parsedEvent.id](parsedEvent.err);
        }
      } else {
        for (let handler of this.handlers) {
          handler(parsedEvent);
        }
      }
    };
  }
  waitUntilOpen() {
    return new Promise(
      (resolve) => {
        if (this.socket.readyState === 1) {
          resolve();
        } else {
          this.socket.onopen = () => {
            resolve();
          };
        }
      }
    );
  }
  invokeOperationCall(data) {
    return this.waitUntilOpen()
      .then(() => {
        this.socket.send(JSON.stringify(data));
        return new Promise(
          (resolve, reject) => {
            this.promiseResolvers[data.id] = resolve;
            this.promiseRejecters[data.id] = reject;
          });
      });
  }
  addEventHandler(handler) {
    this.handlers.push(handler);
  }
}
