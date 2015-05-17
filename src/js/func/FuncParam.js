var React = require('react');

var FuncParam = React.createClass({
  render: function () {
    var name = this.props.name,
      def = this.props.def;

    return (
      <a href='#'>
        {name}
      </a>
    )
  }
});

module.exports = FuncParam;
