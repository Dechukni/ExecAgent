'use strict';

import RESTcaller from './RESTcaller.js';
import ExecClientChannel from '../src/ExecClientChannel.js';

export default class ExecClient {
  constructor(address = 'http://localhost', port = '9000', saveHistory = true) {
    this.process = {
      start: function (nameObj, cmdLine) {
        const caller = new RESTcaller(address);

        if (cmdLine !== undefined) {
          caller.start({name: nameObj, commandLine: cmdLine});
        } else {
          caller.start(nameObj);
        }
      }
    };
  }
  channel() {
    return new ExecClientChannel();
  }
}
