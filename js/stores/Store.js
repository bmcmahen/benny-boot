var Emitter = require('component-emitter');
var AppDispatcher = require('../dispatcher/AppDispatcher');

function Store(dispatcher){
  this.__actions__ = {};
  if (!dispatcher) throw Error('dispatcher required for store');
  this.dispatcher = dispatcher;
  this.dispatcher.register(this.handleAction.bind(this));
}

Emitter(Store.prototype);

Store.prototype.handleAction = function(dispatch){
  var handler;
  var action = dispatch.action;
  var payload = dispatch.payload;

  if (!!(handler = this.__actions__[action])) {
    if (typeof handler === 'function') {
      handler.call(this, payload);
    } else if (handler && typeof this[handler] === 'function') {
      this[handler].call(this, payload);
    }
  }
};

Store.prototype.bindActions = function(){
  var actions = Array.prototype.slice.call(arguments);
  if (actions.length % 2 !== 0) {
    throw new Error('bindActions must take an even number of arguments');
  }

  for (var i = 0; i < actions.length; i+= 2) {
    var type = actions[i];
    var handler = actions[i + 1].bind(this);
    this.__actions__[type] = handler;
  }
}

Store.prototype.bindListener = function(fn){
  this.on('change', fn);
};

Store.prototype.removeListener = function(fn){
  this.off('change', fn);
};


module.exports = Store;