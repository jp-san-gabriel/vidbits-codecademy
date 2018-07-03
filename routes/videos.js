const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res) => {
  const {title, description} = req.body;
  await Video.create({title, description});
  res.status(201).send(`
    <h1>${title}</h1>
    <p>${description}</p>
  `);
});

module.exports = router;
