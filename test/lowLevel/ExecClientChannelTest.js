// import * as chai from 'chai';
// import * as chaiAsPromised from 'chaiAsPromised';
// import ExecClient from '../lib/ExecClient';

var expect = chai.expect;
var client;
var chan;
var ws;

chai.use(chaiAsPromised);

describe('Given an instance of my ExecClientChannel', function () {
  before(function () {
    if (typeof (chan) === 'undefined') {
      client = new ExecClient('192.168.1.242');
      chan = client.channel();
      ws = chan.websocket;
    }
  });
  describe('when I need a test that will pass 100%', function () {
    it('2 plus 2 should be equal to 4', function () {
      expect(2 + 2).to.equal(4);
    });
  });
  describe('when I send test message', function () {
    it('should return message with same name', function () {
      let resultName;
      let data = {operation: 'process.start', id: 123, body: {name: 'ping', commandLine: 'ping ya.ru'}};

      resultName = ws.invokeOperationCall(data)
        .then(function (res) {
          return res.name;
        }
      );
      return expect(resultName).to.eventually.equal('ping');
    });
  });
});
