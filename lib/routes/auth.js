var express = require('express');
var auth = express.Router();
var passport = require('passport');
var db = require('../db');

auth.get('/google', passport.authenticate('google'))

auth.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/util/close',
    failureRedirect: '/google'
  })
);

auth.get('/logout', function(req, res, next){
  req.session.destroy(function(err){
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = auth;