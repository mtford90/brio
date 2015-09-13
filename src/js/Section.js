import React from 'react';
import location from './location';


export default class Section extends React.Component {
  constructor(props) {
    super (props);
    this.state = {path: ''};
  }

   pathSelected (_path) {
    var path = _path || this.state.path;
    var loc = location.getLocation().split('/');
    path = path.split('/');

    for (var i = 0; i < Math.min(loc.length, path.length); i++) {
      if (path[i] == loc[i]) continue;
      return false;
    }
    return true;
  }

  render () {
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
  }

  constructPath () {
    var $node = $(React.findDOMNode(this));
    var path = '/' + this.props.name;
    while ($node.length) {
      $node = $node.parents('.section,.page');
      var name = $node.attr('data-name');
      if ($node.length)  path = '/' + name + path;

    }
    $node.attr('data-path', path);
    this.setState({
      path: path,
      shouldShow: this.pathSelected(path)
    });
  }

  shouldShow () {
    this.setState({shouldShow: this.pathSelected()});
  }

  componentDidMount () {
    this.constructPath();
    this.hashHandler = () => {this.shouldShow()};
    $(window).on('hashchange', this.hashHandler);
  }

  componentWillUnmount () {
    $(window).off('hashchange', this.hashHandler);
  }
}

