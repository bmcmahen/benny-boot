/**
 * Module dependencies
 */

var express = require('express');
var app = express.Router();
var db = require('../db');
var preload = require('../preload');
var requireUser = require('./require_user');

/**
 * Render Home
 */

app.get('/', function(req, res, next){
  var preloadedUser = preload('user', req.user);
  return res.render('app', {
    preload: preloadedUser
  });
});

/**
 * Render close window
 */

app.get('/util/close', function(req, res, next){
  return res.render('close');
});


module.exports = app;