const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res) => {
  const {title, description} = req.body;
  const video = await Video.create({title, description});
  res.status(201).render('videos/show', {video});
});

module.exports = router;
