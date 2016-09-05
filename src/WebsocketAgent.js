'use strict';

export default class WebsocketAgent {
  constructor(url) {
    this.handlers = [];
    this.tempHandler = [];
    this.shouldHandleEvents = true;

    this.promiseResolvers = [];
    this.promiseRejecters = [];

    this.socket = new WebSocket(url);
    this.socket.onmessage = (event) => {
      let parsedEvent = JSON.parse(event.data);

      if (parsedEvent.id !== undefined) {
        if (parsedEvent.body !== null) {
          if (parsedEvent.body.commandLine !== undefined) {
            this.handlers[parsedEvent.body.pid].push(this.tempHandler[parsedEvent.id]);
          }
          this.promiseResolvers[parsedEvent.id](parsedEvent.body);
        } else {
          this.promiseRejecters[parsedEvent.id](parsedEvent.err);
        }
      } else {
        if (this.shouldHandleEvents) {
          for (let handler of this.handlers[parsedEvent.body.pid]) {
            handler(parsedEvent);
          }
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
  addEventHandler(pid, handler) {
    this.handlers[pid].push(handler);
  }
  addTempEventHandler(id, handler) {
    this.tempHandler[id] = handler;
  }
}
