var React = require('react');

var location = require('./location');

var Section = React.createClass({
  getInitialState: function () {
    return {path: ''}
  },
  pathSelected: function (_path) {
    var path = _path || this.state.path;
    var loc = location.getLocation().split('/');
    path = path.split('/');

    for (var i = 0; i < Math.min(loc.length, path.length); i++) {
      if (path[i] == loc[i]) continue;
      return false;
    }
    return true;
  },
  render: function () {
    var style = {};
    if (!this.state.shouldShow) {
      style.display = 'none';
    }
    return (
      <div className="section"
           data-name={this.props.name}
           data-show={this.state.shouldShow}
           style={style}>
        {this.props.children}
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
      path: path,
      shouldShow: this.pathSelected(path)
    });
  },
  shouldShow: function () {
    this.setState({shouldShow: this.pathSelected()});
  },
  componentDidMount: function () {
    this.constructPath();
    var hashHandler = function () {
      // Bit of a hack tbh. The $.off in componentWillUnmount should ensure that no unmounted components attempt to
      // construct the path but it does sometimes get called.
      if (this.isMounted()) {
        this.shouldShow();
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