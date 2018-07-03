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
});
