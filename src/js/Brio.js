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
      menuBar = $this.find('#menu-bar')[0],
      navMenu = $this.find('#nav-menu')[0];

    var pageNames = [];
    $this.find('.page').each(function () {
      pageNames.push($(this).attr('data-name'));
    });

    console.log('pageNames', pageNames);
    menuBar.configureMenu(menuData);
    navMenu.configureMenu(pageNames)


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
