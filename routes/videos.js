const router = require('express').Router();
const Video = require('../models/video');
const querystring = require('querystring');
const {authenticate} = require('../authenticate');

const requiresAuthentication = (req, res, next) => {
  if(req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/videos/create.html', requiresAuthentication, (req, res) => {
  res.render('videos/create');
});

router.post('/videos', requiresAuthentication, async (req, res) => {
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

router.get('/videos/:id/edit', requiresAuthentication, async (req, res) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/update', {video});
});

router.post('/videos/:id/updates', requiresAuthentication, async (req, res) => {
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

router.post('/videos/:id/comments', async (req, res) => {
  const {commenter, comment} = req.body;
  const id = req.params.id;
  const video = await Video.findById(id);

  if(!comment) {
    res.status(400).render('videos/show', {
      video,
      comment: {commenter},
      commentError: 'a comment is required'
    });
    return;
  }

  if(!video.comments) {
    video.comments = [];
  }
  video.comments.push({commenter, comment});
  await video.save();
  res.status(201).render('videos/show', {video});
});

router.post('/videos/:id/deletions', requiresAuthentication, async (req, res) => {
  const _id = req.params.id;
  await Video.deleteOne({_id});
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login', {layout: false});
});

router.post('/login', (req, res) => {
  const {user, password} = req.body;
  if(authenticate({user, password})) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.render('login', {layout: false, error: 'Invalid username or password'});
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  delete res.locals.session;
  res.redirect('/videos');
});

module.exports = router;
