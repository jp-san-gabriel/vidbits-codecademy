const router = require('express').Router();

router.post('/videos', (req, res) => {
  res.sendStatus(201);
});

module.exports = router;
