'use strict';

import WebsocketAgent from './WebsocketAgent.js';

export default class ExecClientChannel {
  constructor(address = 'ws://localhost:9000/connect') {
    this.websocket = new WebsocketAgent(address);
  }
}
