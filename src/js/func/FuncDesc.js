var React = require('react');

var FuncDesc = React.createClass({
  render: function () {
    var desc = this.props.func.description;
    return (
      <div className="func-desc">
        {desc}
      </div>
    );
  }
});

module.exports = FuncDesc;
