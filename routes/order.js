const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order.js');

router.get('/', function (req, res, next) {
  Order.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* SAVE DISH */
router.post('/', function(req, res, next) {
  Order.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE DISH */
router.put('/:id', function(req, res, next) {
  Order.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
