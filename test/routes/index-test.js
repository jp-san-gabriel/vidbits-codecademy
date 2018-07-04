const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('Server path: /', () => {

  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders existing videos', async () => {
      // Setup
      const existingVideo = await Video.create({
        title: 'Shampoo Prank 890111',
        description: 'Cold Water Edition'
      });

      //Exercise
      const response = await request(app).get('/');

      // Verify
      assert.include(response.text, existingVideo.title);
    });
  });
});
