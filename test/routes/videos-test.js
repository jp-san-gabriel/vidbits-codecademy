const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {jsdom} = require('jsdom');

describe('Server path: /videos', () => {
  // Setup Phase
  beforeEach(connectDatabase);

  // Teardown Phase
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders existing videos', async () => {
      // Setup
      const existingVideo = await Video.create({
        title: 'Shampoo Prank 890111',
        description: 'Cold Water Edition'
      });

      //Exercise
      const response = await request(app).get('/videos');

      // Verify
      assert.include(response.text, existingVideo.title);
    });
  });

  describe('POST', () => {
    it('responds 201 status for new video creation', async () => {
      // Setup
      const videoToSave = {
        title: 'Sample Title'
      }

      // Exercise
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToSave);

      // Verify
      assert.equal(response.status, 201);
    });

    it('saves a video', async () => {
      // Setup
      const videoToSave = {
        title: 'Shampoo Prank',
        description: 'cold water edition'
      };

      // Exercise
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToSave);

      // Verify
      const savedVideo = await Video.findOne({});
      assert.equal(savedVideo.title, videoToSave.title);
      assert.equal(savedVideo.description, videoToSave.description);
      //ensure response contains video details
      assert.include(response.text, videoToSave.title);
      assert.include(response.text, videoToSave.description);
    });

    it('does not save a video with empty title', async() => {
      // Setup
      const videoToSave = {
        title: ''
      };

      // Exercise
      await request(app)
        .post('/videos')
        .type('form')
        .send(videoToSave);

      // Verify
      const videos = await Video.find({});
      assert.isEmpty(videos);
    });

    it('does not accept a Video with empty title', async () => {
      // setup
      const videoToSave = {
        title: ''
      }
      // Exercise
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToSave);

      //Verify
      assert.equal(response.status, 400);
    });

    it('renders video form when title is empty', async () => {
      // setup
      const videoToSave = {
        title: ''
      };

      // Exercise
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToSave);

      // Verify
      assert.exists(jsdom(response.text).querySelector('form input[name="title"]'),
        'could not find input with name "title"');
    });
  });
});
