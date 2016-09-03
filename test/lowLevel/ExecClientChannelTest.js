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
      console.log('initiate new WebsocketAgent');
      client = new ExecClient();
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

      resultName = ws.invokeOperationCall('process.start', 123, {name: 'ping', commandLine: 'ping ya.ru'})
        .then(function (res) {
          console.log(JSON.stringify(res, null, 4));
          return res.id;
        }
      );
      return expect(resultName).to.eventually.equal('ping');
    });
  });
  describe.skip('when I want to get next event(s)', function () {
    it('should return next event', function () {
      var resultAlert;

      resultAlert = chan.onMessagePromise().then(function (res) {
        return console.log(JSON.stringify(res, null, 4));
      });
      return expect(resultAlert).to.be.fulfilled;
    });
    it('should return next 2 events bodies using event handler', function () {
      var resultAlert;

      this.timeout(3000);
      function output(out) {
        return console.log(JSON.stringify(out.body, null, 4));
      }
      chan.addEventHandler(output);
      resultAlert = chan.onMessagePromise()
      .then(function () {
        return chan.onMessagePromise();
      })
      .then(function () {
        return chan.removeEventHandler(output);
      });
      return expect(resultAlert).to.be.fulfilled;
    });
    it('should return next events via handler', function () {
      var counter = 0;

      function output(out) {
        counter++;
        return console.log(JSON.stringify(out, null, 4), counter);
      }
      chan.addEventHandler(output);
      return expect(counter).to.be.equal(0);
    });
    it('should return next events via handler alternatively', function () {
      var counter = 0;

      function output(out) {
        counter--;
        return console.log(JSON.stringify(out, null, 4), counter);
      }
      chan.addEventHandler(output);
      return expect(counter).to.be.equal(0);
    });
  });
});
