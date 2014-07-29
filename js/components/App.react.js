/**  @jsx React.DOM  */

var React = require('react');
var AppStore = require('../stores/AppStore');

/**
 * Retrieve weight data from WeightStore
 */

function getAppState(){
  return {
    appStore: AppStore
  };
}

/**
 * Main App Class
 */

var App = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    AppStore.bindListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.bindListener(this._onChange);
  },

  render: function() {
    return (
      <div className='App banner'>
        <Page 
          app={this.state.appStore}
        />
      </div>
    )
  },

  _onChange: function(){
    this.setState(getAppState());
  }

});

module.exports = App;