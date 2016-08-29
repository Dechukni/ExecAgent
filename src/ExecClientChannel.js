'use strict';

import * as ws from 'websocket';

export default class ExecClientChannel {
  constructor() {
    this._name = 'WebSocket';
    this.socket = new ws.w3cwebsocket('ws://localhost:9000/connect');
    this.handlers = [];
  }
  returnName() {
    return this._name;
  }
  onOpenPromise() {
    return new Promise(
      (resolve) => {
        this.socket.onopen = () => {
          this._name = 'OpenedWebSocket';
          resolve(this._name);
        };
      }
    );
  }
  sendTestMessage(command, id, body) {
    this.socket.send(
      JSON.stringify({
        operation: command,
        id: String(id),
        body: body
      })
    );
  }
  onMessagePromise() {
    return new Promise(
      (resolve, reject) => {
        this.socket.onmessage = (event) => {
          let parsedEvent = JSON.parse(event.data);

          for (let handler of this.handlers) {
            handler(parsedEvent);
          }
          if (!('error' in parsedEvent) || (parsedEvent.error === null)) {
            resolve(parsedEvent);
          } else {
            reject(parsedEvent.error);
          }
        };
      }
    );
  }
  addEventHandler(handler) {
    this.handlers.push(handler);
  }
  removeEventHandler(handler) {
    let handlerIndex = this.handlers.indexOf(handler);

    if (handlerIndex !== -1) {
      this.handlers.splice(handlerIndex, 1);
    }
  }
}
