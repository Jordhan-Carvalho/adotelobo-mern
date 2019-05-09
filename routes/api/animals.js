const express = require('express');

const router = express.Router();

// @route GET api/animals
// @desc  Test route
// @acess Public
router.get('/', (req, res) => {
  res.send('Animals route');
});

module.exports = router;
