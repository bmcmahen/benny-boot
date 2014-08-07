var React = require('./react');

var HelloMessage = React.createClass({

  render: function() {
    return <div>time: {this.props.user.time}</div>;
  }
});

module.exports = HelloMessage;
