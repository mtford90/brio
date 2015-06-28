var React = require('react');


var Markdown = React.createClass({
  render: function () {
    return (
      <div className="markdown">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Markdown;