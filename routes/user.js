const express = require('express');
const router = express.Router();
const user = require('../services/user');


router.get('/', function(req, res, next) {
  try {
    res.json(user.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error Fetching users `, err.message);
    next(err);
  }
});

module.exports = router;