const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const {getElementFromHtml} = require('../test-utilities');

describe('Server path: /login', () => {
  describe('GET', () => {
    it('renders empty login form', async () => {
      // setup

      // Exercise
      const response = await request(app).get('/login');

      // Verify
      assert.equal(getElementFromHtml(response.text, 'form input[type="text"][name="user"]').value, '');
      assert.equal(getElementFromHtml(response.text, 'form input[type="password"][name="password"]').value, '');
    });
  });
});
