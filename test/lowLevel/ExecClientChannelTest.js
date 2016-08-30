// import * as chai from 'chai';
// import * as chaiAsPromised from 'chaiAsPromised';
// import ExecClient from '../lib/ExecClient';

var expect = chai.expect;
var client;
var chan;

chai.use(chaiAsPromised);

describe('Given an instance of my ExecClientChannel', function () {
  before(function () {
    if (typeof (chan) === 'undefined') {
      console.log('initiate new ExecClientChannel');
      client = new ExecClient();
      chan = client.channel();
    }
  });
  after(function () {
    console.log('closing new ExecClientChannel');
    chan.close();
  });
  describe('when I need a test that will pass 100%', function () {
    it('2 plus 2 should be equal to 4', function () {
      expect(2 + 2).to.equal(4);
    });
  });
  describe('when I need the opened channel', function () {
    it('should return confirmation that channel is opened', function () {
      return expect(chan.onOpenPromise()).to.eventually.equal('OpenedWebSocket');
    });
  });
  describe('when I send test message', function () {
    it('should return message with same id', function () {
      var resultId;

      chan.sendTestMessage('process.start', 123,
        {name: 'ping', commandLine: 'ping ya.ru'});
      resultId = chan.onMessagePromise()
        .then(function (res) {
          console.log(JSON.stringify(res, null, 4));
          return res.id;
        }
      );
      return expect(resultId).to.eventually.equal('123');
    });
  });
  describe('when I want to get next event(s)', function () {
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
    it.skip('should return next events via handler', function () {
      var counter = 0;

      function output(out) {
        counter++;
        return console.log(JSON.stringify(out, null, 4), counter);
      }
      chan.addEventHandler(output);
      return expect(counter).to.be.equal(0);
    });
    it.skip('should return next events via handler alternatively', function () {
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
