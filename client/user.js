var Store = require('datastore');

var user = new Store();

user.set('name', 'ben');

setInterval(function(){
  user.set('time', (user.get('time') || 0) + 1);
}, 1000);

setTimeout(function(){
  user.set('name', 'mcmahen');
}, 5000);

module.exports = user;