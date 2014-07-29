/** @jsx React.DOM */

var React = require('react');
var debug = require('debug')('heavy');

window.bugger = require('debug');

var App = require('./components/App.react');

React.renderComponent(
  <App />,
  document.getElementsByTagName('body')[0]
)