/**
 * Module dependencies
 */

var request = require('superagent');
var merge = require('merge');
var Emitter = require('emitter');
var type = require('type');

/**
 * User Store
 */

function UserStore(){
  this.url = '/api/user';
  this.attr = {};
  this.saved = {};
  this.error = null;
}

Emitter(UserStore.prototype);

/** 
 * Fetch User
 * 
 * @param  {Function} fn 
 */

UserStore.prototype.fetch = function(fn){

  if (window.current_user) {
    return this.reset(window.current_user);
  }

  request
    .get(this.url)
    .end(function(res){
      if (res.error) {
        this.setError('Error fetching.');
        if (fn) fn(res.text);
        return;
      }
      this.set(attr);
    }.bind(this));
};

/**
 * Save User
 * 
 * @param  {Function} fn 
 */

UserStore.prototype.save = function(fn){
  request
    .put(this.url)
    .send(this.attr)
    .end(function(res){
      if (res.error) {
        if (this.saved) this.set(this.saved);
        this.setError('Error saving.');
        if (fn) fn(res.text);
        return;
      }
      this.saved = res.body;
      this.set(res.body);
      this.emit('saved');
      if (fn) fn(null, res.body);
    }.bind(this))
};

/**
 * set Error to message
 *
 * @param {String} msg 
 */

UserStore.prototype.setError = function(msg){
  this.error = msg;
  this.emit('error', msg);
  this.emit('change');
};

/**
 * set key to val
 *
 * @param {String} key 
 * @param {String} val 
 */

UserStore.prototype.set = function(key, val){
  if (type(key) == 'string') {
    this.attr[key] = val;
    this.emit('change', key, val);
  } else {
    this.attr = merge(this.attr, attr);
  }
  // this.emit('change');
};

/**
 * Get attr by name
 *
 * @param  {String} name 
 *
 * @return {Mixed}      
 */

UserStore.prototype.get = function(name){
  return this.attr[name];
};

/**
 * Reset to attr
 *
 * @param  {Object} attr 
 *
 * @return {null}      
 */

UserStore.prototype.reset = function(attr){
  this.attr = attr;
  delete this.error;
  this.emit('change');
}

/**
 * get attributes in json
 *
 * @return {Object} 
 */

UserStore.prototype.toJSON = function(){
  return merge({ error: this.error }, this.attr);
};

var user = new UserStore();
user.fetch();

module.exports = user;

setInterval(function(){
  user.set('time', (user.get('time') || 0) + 1);
  console.log(user.get('time'));
}, 1000);

setInterval(function(){
  user.set('name', (user.get('name') || 0) + 1)
}, 3000);