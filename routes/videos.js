const router = require('express').Router();
const Video = require('../models/video');

router.get('/videos/create.html', (req, res) => {
  res.render('videos/create');
});

router.post('/videos', async (req, res) => {
  const {title, description} = req.body;
  const video = new Video({title, description});

  if(title) {
    await video.save();
    res.status(201).render('videos/show', {video});
  } else {
    const error = 'Title is required';
    res.status(400).render('videos/create', {video, error});
  }
});

router.get('/videos', async(req, res) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

module.exports = router;
