var expect = chai.expect;
var should = chai.should();
var ws;

chai.use(chaiAsPromised);

describe('Given an instance of my ExecClientChannel', function () {
  before(function () {
    if (typeof(ws) === 'undefined') {
      console.log('initiate new ExecClientChannel');
      ws = new channel();
    }
  });
  describe('when I need a test that will pass 100%', function() {
    it('2 plus 2 should be equal to 4', function() {
          (2+2).should.be.equal(4);
        }
    );
  });
  describe('when I need the opened channel', function () {
    it('should return confirmation that channel is opened', function () {
        return ws.onOpenPromise().should.eventually.equal('OpenedWebSocket');
      }
    );
  });
  describe('when I send test message', function () {
    it('should return message with same id', function () {
        ws.sendTestMessage("process.start", 123,
          {name:"ping", commandLine:"ping ya.ru"});
        var result_id = ws.onMessagePromise().then(function(res) {
            console.log(JSON.stringify(res, null, 4));
            return res.id;
          }
        );
        return expect(result_id).to.eventually.equal("123");
      }
    );
  });
  describe('when I want to get next event(s)', function () {
    it('should return next event', function() {
        var result_alert = ws.onMessagePromise().then(function(res) {
            return console.log(JSON.stringify(res, null, 4));
          }
        );
        return expect(result_alert).to.be.fulfilled;
      }
    );
    it('should return next 2 events bodies using event handler', function () {
        this.timeout(3000);
        function output(out) {
          return console.log(JSON.stringify(out.body, null, 4))
        }
        ws.addEventHandler(output);
        var result_alert = ws.onMessagePromise()
          .then(function() {
            return ws.onMessagePromise();
          }
        ) .then(function() {
            return ws.removeEventHandler(output);
          }
        );

        return expect(result_alert).to.be.fulfilled;
      }
    );
    it('should return next events via handler', function() {
        var counter = 0;
        function output(out) {
          counter++;
          return console.log(JSON.stringify(out, null, 4), counter);
        }
        ws.addEventHandler(output);
        return expect(counter).to.be.equal(0);
      }
    );
    it('should return next events via handler alternatively', function() {
        var counter = 0;
        function output(out) {
          counter--;
          return console.log(JSON.stringify(out, null, 4), counter);
        }
        ws.addEventHandler(output);
        return expect(counter).to.be.equal(0);
      }
    );
  });
});