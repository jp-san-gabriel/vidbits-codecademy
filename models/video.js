const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: String
    },
    videoUrl: {
      type: String,
      required: [true, 'a URL is required']
    }
  })
);

module.exports = Video;
