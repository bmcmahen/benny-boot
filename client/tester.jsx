var React = require('./react');
var user = require('./user');
var Subview = require('./subview.jsx');

function getUserState(){
  return {
    user: user.data
  }
}

var HelloMessage = React.createClass({

  getInitialState: function(){
    return getUserState();
  },

  componentDidMount: function(){
    user.on('change', this._onChange);
  },

  componentWillUnmount: function(){
    user.off('change', this._onChange);
  },

  render: function() {
    return (
      <div>
        <div>Hello {this.state.user.name}</div>
        <Subview user={this.state.user}/>
      </div>
    ) 
  },

  _onChange: function(){
    this.setState(getUserState());
  }
});

React.renderComponent(
  <HelloMessage />,
  document.body
);

