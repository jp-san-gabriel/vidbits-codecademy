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

    it('is required', () => {
      // Setup
      const video = new Video({title: 'Sample Title'});

      // Exercise
      video.validateSync();

      // Verify
      assert.equal(video.errors.videoUrl.message, 'a URL is required');
    });
  });

  describe('#comments', () => {
    it('is an Array', () => {
      // Exercise
      const video = new Video({
        title: 1,
        videoUrl: 2
      });

      // Verify
      assert.equal(video.comments.length, 0);
    });
  });

  describe('#comments.commenter', () => {
    it('is a String', () => {
      // Exercise
      const commenter = 3;
      const video = new Video({
        title: 1,
        videoUrl: 2,
        comments:[{commenter}]
      });

      // Verify
      assert.equal(video.comments[0].commenter, commenter.toString());
    });
  })

  describe('#comments.comment', () => {
    it('is a String', () => {
      // Exercise
      const comment = 3;
      const video = new Video({
        title: 1,
        videoUrl: 2,
        comments:[{comment}]
      });

      // Verify
      assert.equal(video.comments[0].comment, comment.toString());
    });

    it('is required', () => {
      // Exercise
      const video = new Video({});
      const comment = video.comments.create({commenter: 3});
      comment.validateSync();

      // Verify
      assert.equal(comment.errors.comment.message, 'a comment is required');
    });
  })
});
