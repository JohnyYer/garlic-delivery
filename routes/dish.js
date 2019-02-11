const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dish = require('../models/Dish.js');

/* GET ALL DISHES */
router.get('/', function (req, res, next) {
  Dish.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE DISH BY ID */
router.get('/:id', function( req, res, next) {
  Dish.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE DISH */
router.post('/', function(req, res, next) {
  Dish.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE DISH */
router.put('/:id', function(req, res, next) {
  Dish.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE DISH */
router.delete('/:id', function(req, res, next) {
  Dish.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
