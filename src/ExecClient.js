'use strict';

import ExecClientChannel from '../src/ExecClientChannel.js';

export default class ExecClient {
  constructor() {}
  channel() {
    return new ExecClientChannel();
  }
}
