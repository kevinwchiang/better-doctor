const app = require('./server.js');
const request = require('supertest')(app);
const _ = require('lodash');

describe('Test the root path', () => {
  test('It should respond to the GET method', (done) => {
    request.get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done);
  });
});

describe('Test POST request for doctor search', () => {
  let initialResults;
  test('It should return 10 results at most', (done) => {
    const user = { name: 'He' };
    request.post('/search')
      .send(user)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, result) => {
        const body = JSON.parse(result.body);
        expect(body.data.length).toBeLessThan(11);
        initialResults = body.data;
        done();
      });
  });
  test('It should skip the first 10 results if we pass a value for skip', (done) => {
    const user = { name: 'He', skip: 10 };
    request.post('/search')
      .send(user)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, result) => {
        const body = JSON.parse(result.body);
        expect(_.isEqual(body.data[0].uid, initialResults[0].uid)).toBe(false);
        done();
      });
  });
});
