var React = require('react');

var location = require('./location');

var Section = React.createClass({
  getInitialState: function () {
    return {path: ''}
  },
  render: function () {
    var shouldShow = location.pathSelected(this.state.path);
    return (
      <div className="section" data-name={this.props.name} data-show={this.state.show}>
        {shouldShow ? this.props.children : ''}
      </div>
    );
  },
  constructPath: function () {
    var $node = $(this.getDOMNode());
    var path = '/' + this.props.name;
    while ($node.length) {
      $node = $node.parents('.section');
      var name = $node.attr('data-name');
      if ($node.length) {
        path = '/' + name + path;
      }
    }
    $(this.getDOMNode()).attr('data-path', path);
    this.setState({
      path: path
    })
  },
  componentDidMount: function () {
    var hashHandler = function () {
      this.constructPath();
    }.bind(this);
    $(window).on('hashchange', hashHandler);
    this.hashHandler = hashHandler;
  },
  componentWillUnmount: function () {
    $(window).off('hashchange', this.hashHandler);
  }
});

module.exports = Section;