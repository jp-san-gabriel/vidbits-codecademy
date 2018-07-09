const {assert} = require('chai');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video');

describe('Model: Video', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('#title', () => {
    it('is a String', () => {
      // Setup
      const titleAsNumber = 1;

      // Exercise
      const video = new Video({title: titleAsNumber});

      // Verify
      assert.strictEqual(video.title, titleAsNumber.toString());
    });

    it('is required', () => {
      // Setup
      const video = new Video({});

      // Exercise
      video.validateSync();

      // Verify
      assert.equal(video.errors.title.message, 'Title is required');
    });
  });

  describe('#description', () => {
    it('is a String', () => {
      // Setup
      const descriptionAsNumber = 1;

      //Exercise
      const video = new Video({description: descriptionAsNumber});

      // Verify
      assert.strictEqual(video.description, descriptionAsNumber.toString());
    });
  });

  describe('#videoUrl', () => {
    it('is a String', () => {
      // Setup
      const videoUrlAsNumber = 1;

      // Exercise
      const video = new Video({videoUrl: videoUrlAsNumber});

      // Verify
      assert.strictEqual(video.videoUrl, videoUrlAsNumber.toString());
    });
  });
});
