'use strict';

import WebsocketAgent from './WebsocketAgent.js';
import utils from './utils';

export default class ExecClientChannel {
  constructor(address = 'ws://localhost:9000/connect') {
    const websocket = new WebsocketAgent(address);

    this.process = {
      start: function (nameObj, cmdLine) {
        let data = {operation: 'process.start', id: utils.generateId()};

        if (cmdLine !== undefined) {
          data.body = {name: nameObj, commandLine: cmdLine};
          return websocket.start(data);
        }
        if (nameObj.handler !== undefined) {
          websocket.addTempEventHandler(data.id, nameObj.handler);
          delete nameObj.handler;
        }
        data.body = nameObj;
        return websocket.start(data);
      }
    };
  }
}
