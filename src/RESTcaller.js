import * as request from 'superagent';

export default class RESTcaller {
  constructor(url) {
    this.url = url;
  }
  start(data) {
    return new Promise(
      (resolve, reject) => {
        request
          .post(`${this.url}/process`)
          .send(data)
          .set('Accept', 'application/json')
          .end(function (err, res) {
            if (err || !res.ok) {
              let codeDescription;

              if (err.status === 400) codeDescription = 'Incoming data is not valid';
              if (err.status === 404) codeDescription = 'Specified channel doesnt exist';
              if (err.status === 500) codeDescription = 'Something went wrong in ExecAgent';
              let result = {
                code: err.status,
                codeDescription: codeDescription
              };

              reject(result);
            } else {
              let result = {
                code: 200,
                codeDescription: 'Succesfully started process',
                body: res.body
              };

              resolve(result);
            }
          }
        );
      }
    );
  }
}
