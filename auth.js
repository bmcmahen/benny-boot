var passport = require('passport');
var mongojs = require('mongojs');
var config = require('config');
var GoogleStrategy = require('passport-google').Strategy
var db = require('./db');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.users.findOne({ _id : mongojs.ObjectId(id) }, done);
});

passport.use(new GoogleStrategy({
    returnURL: config.auth.google.returnURL,
    realm: config.auth.google.realm
  },
   function(identifier, profile, done) {
    findOrCreateUser(profile, function(usr){
      done(null, usr);
    });
  }
));

/**
 * Query our database for the user, and if it doesn't
 * exist then insert a new user
 * @param  {Object}   profile 
 * @param  {Function} fn      
 */

function findOrCreateUser(profile, fn){
  var email = profile.emails 
    && profile.emails[0] 
    && profile.emails[0].value;

  if (!email) return fn(null);

  db.users.findOne({ email: email }, function(err, doc){
    if (err) return fn(null);
    else if (doc) fn(doc);
    else {
      db.users.save({ email : email }, function(err, doc){
        if (err) return fn(null);
        return fn(doc);
      });
    }
  });
 
}