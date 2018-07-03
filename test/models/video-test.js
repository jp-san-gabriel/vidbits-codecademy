const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const Video = require('../../models/video');

async function connectDatabase() {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

describe('Model: Video', () => {

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

});

module.exports = {
  connectDatabase,
  disconnectDatabase,
}
