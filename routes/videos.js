const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res) => {
  const {title, description} = req.body;
  await Video.create({title, description});
  res.sendStatus(201);
});

module.exports = router;
