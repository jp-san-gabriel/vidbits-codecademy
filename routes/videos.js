const router = require('express').Router();
const Video = require('../models/video');

router.get('/videos/create.html', (req, res) => {
  res.render('videos/create');
});

router.post('/videos', async (req, res) => {
  const {title, description, videoUrl} = req.body;
  const video = new Video({title, description, videoUrl});

  if(title) {
    await video.save();
    res.redirect(302, `/videos/${video._id}`);
  } else {
    const error = 'Title is required';
    res.status(400).render('videos/create', {video, error});
  }
});

router.get('/videos', async(req, res) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

router.get('/videos/:id', async (req, res) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);
  res.render('videos/show', {video});
});

module.exports = router;
