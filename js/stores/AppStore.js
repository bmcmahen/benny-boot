/**
 * Module dependencies
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var CreateStore = require('./CreateStore');
var debug = require('debug')('app:stores:appstore');

/**
 * Create App Store
 * - this is where routing logic will go, too.
 */

var AppStore = CreateStore(AppDispatcher, {

  initialize: function() {
    this.page = 'intro';

    this.bindActions(
      AppConstants.SWITCH_PAGE, this.onSwitchPage
    )
  },

  onSwitchPage: function(page){
    debug('switch page to', page);
    this.page = page;
    this.emit('change');
  }

});

module.exports = AppStore;