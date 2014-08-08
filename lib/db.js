var mongojs = require('mongojs');
var config = require('../config.json');
var debug = require('debug')('app:db');

// docs: https://github.com/mafintosh/mongojs
var db = mongojs(config.db, config.collections);

db.on('error', function(err){
  debug('Database error', err);
});

db.on('ready', function(){
  debug('Database Ready');
});

module.exports = db;
