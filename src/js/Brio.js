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
    let menuData = this.constructMenu(),
      $this = $(React.findDOMNode(this)),
      menuBar = $this.find('#menu-bar')[0];
    menuBar.configureMenu(menuData);
  }

  _constructMenu(d, $sections, path) {
    let self = this;
    $sections.each(function () {
      let $section = $(this),
        name = $section.attr('data-name'),
        newPath = path + '/' + name;
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
