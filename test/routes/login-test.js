const {assert} = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const {getElementFromHtml, getValidCredentials} = require('../test-utilities');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('Server path: /login', () => {
  let request = null;

  // Setup Phase
  beforeEach(async () => {
    await connectDatabase();
    request = supertest.agent(app);
  });

  // Teardown Phase
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders empty login form', async () => {
      // setup

      // Exercise
      const response = await request.get('/login');

      // Verify
      assert.equal(getElementFromHtml(response.text, 'form input[type="text"][name="user"]').value, '');
      assert.equal(getElementFromHtml(response.text, 'form input[type="password"][name="password"]').value, '');
    });
  });

  describe('POST', () => {
    it('logs in the user', async () => {
      // Setup
      const credentials = getValidCredentials();

      // Exercise - send the username and password
      const response = await request
              .post('/login')
              .redirects()
              .type('form')
              .send(credentials);

      // Verify - that the response contains the username
      assert.include(response.text, credentials.user);
    });

    it('redirects to landing page', async () => {
      // Setup
      const credentials = getValidCredentials();

      // Exercise - send the username and password
      const response = await request
        .post('/login')
        .type('form')
        .send(credentials);

      // Verify
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });

    it('displays an error message with incorrect credentials', async () => {
      // Setup
      const user = 'invalid_username';
      const password = 'invalid_password';

      // Exercise - send the username and password
      const response = await request
        .post('/login')
        .type('form')
        .send({user, password});

      // Verify
      assert.include(response.text, 'Invalid username or password');
    });
  });
});

describe('Server path: /logout', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('logs out the user', async () => {
      // Setup
      const credentials = getValidCredentials();
      const request = supertest.agent(app);

      // Exercise - Log in then log out
      await request.post('/login')
        .type('form')
        .send(credentials);

      const response = await request
        .get('/logout')
        .redirects();

      // Verify
      assert.include(response.text, 'Log in');
      assert.notInclude(response.text, 'Log out');
    });

    it('redirects to index page', async () => {
      // Setup
      const credentials = getValidCredentials();
      const request = supertest.agent(app);

      // Exercise
      await request.post('/login')
        .type('form')
        .send(credentials);

      const response = await request.get('/logout');

      // Verify
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/videos');
    });
  });
});
