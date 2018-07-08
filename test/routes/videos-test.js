const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {getElementFromHtml} = require('../test-utilities');

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
    it('renders the new video', async () => {
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
      const savedVideo = await Video.findOne({});
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, `/videos/${savedVideo._id}`);
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
        .redirects(1)
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

    describe("with empty video title", () => {
      it('does not save the video', async() => {
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

      it('responds with a 400 status code', async () => {
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

      it('renders the video form', async () => {
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
        assert.exists(getElementFromHtml(response.text,'form input[name="title"]'),
          'could not find input with name "title"');
      });

      it('displays an error message', async () => {
        // setup
        const videoToSave = { title: '' };

        // Exercise'
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoToSave);

        // Verify
        assert.include(response.text, 'Title is required');
      });

      it('preserves the other field values', async () => {
        // Setup
        const videoToSave = {
          title: '',
          description: 'This is an untitled video'
        }

        // Exercise
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoToSave);

        //Verify
        assert.include(response.text, 'Title is required');
        assert.include(response.text, videoToSave.description);
      });
    });
  });
});

describe("Server path: /videos/:id", () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe("GET", () => {
    it("renders the video", async () => {
      // Setup
      const video = await Video.create({
        title: 'Shampoo Prank 890111',
        description: 'Cold Water Edition'
      });

      // Exercise
      const response = await request(app)
        .get(`/videos/${video._id}`);

      // Verify
      assert.include(response.text, video.title);
    });
  });
})
