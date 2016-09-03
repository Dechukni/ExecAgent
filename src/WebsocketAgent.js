'use strict';

import * as ws from 'websocket';

export default class WebsocketAgent {
  constructor(url) {
    this.handlers = [];
    this.promises = [];
    this.socket = new ws.w3cwebsocket(url);

    this.socket.onmessage = (event) => {
      let parsedEvent = JSON.parse(event.data);

      for (let promise of this.promises) {
        if (promise.id === parsedEvent.id) {
          if (parsedEvent.body !== null) {
            promise.answer = Promise.resolve(parsedEvent.body);
          } else {
            promise.answer = Promise.reject(parsedEvent.err);
          }
        }
      }
      for (let handler of this.handlers) {
        handler(parsedEvent);
      }
    };
  }
  invokeOperationCall(data) {
    let promise = {id: data.id, answer: new Promise()};

    this.socket.send(data);
    this.promises.push(promise);
    return promise.answer;
  }
  addEventHandler(handler) {
    this.handlers.push(handler);
  }
}
