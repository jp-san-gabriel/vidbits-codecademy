const router = require('express').Router();
const Video = require('../models/video');
const querystring = require('querystring');

router.get('/videos/create.html', (req, res) => {
  res.render('videos/create');
});

router.post('/videos', async (req, res) => {
  const {title, description, videoUrl} = req.body;
  const video = new Video({title, description, videoUrl});
  video.validateSync();

  if(!video.errors) {
    await video.save();
    res.redirect(302, `/videos/${video._id}`);
  } else {
    res.status(400).render('videos/create', {video});
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

router.get('/videos/:id/edit', async (req, res) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/update', {video});
});

router.post('/videos/:id/updates', async (req, res) => {
  const _id = req.params.id;
  const {title, description, videoUrl} = req.body;

  await Video.updateOne({_id}, {title, description, videoUrl}, {runValidators:true}, function(err) {
    if(!err) {
      res.redirect(`/videos/${_id}`);
    } else {
      res.status(400).render('videos/update', {video: {_id, title, description, videoUrl, errors:err.errors}});
    }
  });
});

router.post('/videos/:id/deletions', async (req, res) => {
  const _id = req.params.id;
  await Video.deleteOne({_id});
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const {user, password} = req.body;
  if(user === 'admin' && password == 'password') {
    res.redirect('/');
  } else {
    res.render('login', {error: 'Invalid username or password'});
  }
});

module.exports = router;
