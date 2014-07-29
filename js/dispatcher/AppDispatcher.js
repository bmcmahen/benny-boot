var Dispatcher = require('./Dispatcher');
var _ = require('underscore');

var AppDispatcher = _.extend(Dispatcher.prototype, {
  handleAction: function(action, payload) {
    this.dispatch({
      source: 'VIEW_ACTION',
      payload: payload,
      action: action
    });
  },

  handleSyncAction: function(action, payload){
    this.dispatch({ 
      source: 'SYNC_ACTION', 
      payload: payload,
      action: action
    });
  }
});

module.exports = AppDispatcher;