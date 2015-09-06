var React = require('react');

var location = require('./location');

var Section = React.createClass({
  getInitialState: function () {
    return {path: ''}
  },
  render: function () {
    var path = this.state.path;
    var shouldShow = location.pathSelected(path);
    console.log('path', path);
    console.log('shouldShow', shouldShow);
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
      console.log(this);
      // Bit of a hack tbh. The $.off in componentWillUnmount should ensure that no unmounted components attempt to
      // construct the path but it does sometimes get called.
      if (this.isMounted()) {
        this.constructPath();
      }
    }.bind(this);
    $(window).on('hashchange', hashHandler);
    this.hashHandler = hashHandler;
  },
  componentWillUnmount: function () {
    $(window).off('hashchange', this.hashHandler);
  }
});

module.exports = Section;