const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const {getElementFromHtml} = require('../test-utilities');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('Server path: /login', () => {
  // Setup Phase
  beforeEach(connectDatabase);

  // Teardown Phase
  afterEach(disconnectDatabase);

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

  describe('POST', () => {
    it('logs in the user', async () => {
      // Setup
      const user = 'admin';
      const password = 'password';
      // Exercise - send the username and password
      const response = await request(app)
              .post('/login')
              .type('form')
              .send({user, password});

      // Verify - that the response contains the username
      assert.include(response.text, user);
    });

    it('redirects to landing page', async () => {
      // Setup
      const user = 'admin';
      const password = 'password';

      // Exercise - send the username and password
      const response = await request(app)
        .post('/login')
        .type('form')
        .send({user, password});

      // Verify
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
  });
});
