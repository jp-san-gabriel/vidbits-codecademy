const router = require('express').Router();
const Video = require('../models/video');

router.get('/videos/create.html', (req, res) => {
  res.render('videos/create');
});

router.post('/videos', async (req, res) => {
  const {title, description} = req.body;
  if(title) {
    const video = await Video.create({title, description});
    res.status(201).render('videos/show', {video});
  } else {
    res.send('');
  }
});

router.get('/videos', async(req, res) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

module.exports = router;
