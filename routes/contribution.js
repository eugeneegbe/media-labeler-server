const express = require('express');
const router = express.Router();
const contribution = require('../services/contribution');


router.get('/', function(req, res, next) {
  try {
    res.json(contribution.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error Fetching users `, err.message);
    next(err);
  }
});

router.post('/', function (req, res, next) {
    console.log(req.body)
    try {
        res.json(contribution.addContribution(req.body));
    } catch (err) {
        console.error(`Error while getting contributions `, err.message);
        next(err);
    }
});

module.exports = router;