const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');

describe('Server path: /videos', () => {
  it('POST', async () => {
    const response = await request(app)
      .post('/videos')
      .type('form')
    assert.equal(response.status, 201);
  });
});
