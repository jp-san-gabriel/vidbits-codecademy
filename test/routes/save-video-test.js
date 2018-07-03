const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');

describe('Server path: /videos', () => {
  describe('POST', () => {
    it('responds 201 status for new video creation', async () => {
      const response = await request(app)
        .post('/videos')
        .type('form')
      assert.equal(response.status, 201);
    });
  });

  describe('POST', () => {
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
    });
  });
});
