// var type = require('component/type');
// var merge = require('yields/merge');

// function mixin(obj){
//   for (var key in Model.prototype) {
//     obj[key] = Model.prototype[key];
//   }
//   return obj;
// }

// function Model(){
//   if (!(this instanceof Model)) return inherit();
//   this.attr = {};
//   this.error = null;
// }

// Model.prototype.set = function(key, val){
//   if (type(key) == 'string') {
//     this.attr[key] = val;
//   } else {
//     merge(this.attr, attr);
//   }
//   this.emit('change');
// }

// Model.prototype.get = function(name){
//   return this.attr[name];
// }

// Model.prototype.reset = function(attr){
//   this.attr = attr;
//   delete this.error;
//   this.emit('change');
// }

// Model.prototype.setError = function(msg){
//   this.error = msg;
//   this.emit('error', msg);
//   this.emit('change');
// };

// Model.prototype.toJSON = function(){
//   return merge({ error: this.error }, this.attr);
// };

