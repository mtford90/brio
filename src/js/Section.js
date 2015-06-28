var React = require('react');

var Section = React.createClass({
  render: function () {
    return (
      <div className="section" data-name={this.props.name}>
        {this.props.children}
      </div>
    );
  },
  componentDidMount: function () {
    //var domNode = this.getDOMNode(),
    //  subSections = $(domNode).find('.section');
  }
});

module.exports = Section;