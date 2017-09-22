const app = require('./server.js');
const request = require('supertest')(app);
const assert = require('assert');

describe('Test the root path', () => {
  test('It should respond to the GET method', (done) => {
    request.get('/')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200, done);
  });
});

describe('Test POST request for doctor search', () => {
  test('It should return 10 results at most', (done) => {
    const user = {name: 'Bob'};
    request.post('/search')
    .send(user)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .end(function(err, result) {
      const body = JSON.parse(result.body)
      expect(body.data.length).toBeLessThan(11);
      done();
    });
  })
});