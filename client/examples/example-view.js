var ripple = require('ripple');
var refs = require('refs');
var user = require('../storage/user');
var mount = require('../plugins/mount-methods');
var monitor = require('../plugins/monitor-store');
var template = require('./template.html');

var Name = ripple('<div>{{name}}</div>')
  .attr('name');

var User = ripple(template)
  .attr('name', { default: 66 })
  .attr('time')
  .use(monitor(user))
  .use(mount())
  .use(refs)
  .compose('Name', Name);

User.prototype.didMount = function(){
  console.log(this.refs.bacon.innerText);
}

User.prototype.willUnmount = function(){
  console.log(this.refs);
}


var view = new User(user.toJSON());

module.exports = view;
