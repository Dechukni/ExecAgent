'use strict';

import Puid from 'puid';

export default class utils {
  static isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    let x = parseFloat(value);

    return (x | 0) === x;
  }
  static generateId() {
    let puid = new Puid();

    return puid.generate();
  }
}
