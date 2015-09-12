import React from 'react';
import SideMenu from './SideMenu';

export default class Brio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="brio">
        {this.props.children}
      </div>
    )
  }

  componentDidMount() {
    var menuData = this.constructMenu();
    var $this = $(React.findDOMNode(this));
    var menuBar = $this.find('#menu-bar')[0];
    menuBar.configureMenu(menuData);
  }

  _constructMenu(d, $sections, path) {
    var self = this;
    $sections.each(function () {
      var $section = $(this);
      var name = $section.attr('data-name');
      var newPath = path + '/' + name;
      d[name] = {
        name: name,
        path: newPath,
        sections: self._constructMenu({}, $section.children('.section'), newPath)
      }
    });
    return d;
  }

  constructMenu() {
    var $domNode = $(React.findDOMNode(this)),
      $content = $domNode.find('.content'),
      $section = $content.children('.section');

    return this._constructMenu({}, $section, '');
  }
}
