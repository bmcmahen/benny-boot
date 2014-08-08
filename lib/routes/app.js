var express = require('express');
var app = express.Router();
var db = require('../db');

var requireUser = require('./require_user');

app.get('/', function(req, res, next){
  return res.render('app');
});

app.get('/util/close', function(req, res, next){
  return res.render('close');
});

module.exports = app;