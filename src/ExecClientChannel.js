'use strict';

import WebsocketAgent from './WebsocketAgent.js';

export default class ExecClientChannel {
  constructor() {
    this.websocket = new WebsocketAgent();
  }
}
