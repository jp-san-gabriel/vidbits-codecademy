const {mongoose} = require('../database');

const comment = mongoose.Schema({
  commenter: {
    type: String
  }
});
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
    },
    comments: [comment]
  })
);

module.exports = Video;
