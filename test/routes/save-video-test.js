const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');

describe('Server path: /videos', () => {
  describe('POST', async() => {
    it('responds 201 status for new video creation', async () => {
      const response = await request(app)
        .post('/videos')
        .type('form')
      assert.equal(response.status, 201);
    });
  });
});
