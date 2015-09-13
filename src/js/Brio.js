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

  /**
   * Passes a data structure representing the sections of the current page to a hacky method on the side menu DOM
   * node which will then present the side menu.
   * @private
   */
  _configureSideMenu() {
    let menuData = this.constructMenuData(),
      $this = $(React.findDOMNode(this)),
      menuBar = $this.find('#menu-bar')[0];

    menuBar.configureMenu(menuData);
  }

  componentDidMount() {
    let $this = $(React.findDOMNode(this)),
      navMenu = $this.find('#nav-menu')[0];

    var pageNames = [];
    $this.find('.page').each(function () {
      pageNames.push($(this).attr('data-name'));
    });

    navMenu.configureMenu(pageNames);
    this._configureSideMenu();
    this.hashChange = () => {this._configureSideMenu()};
    $(window).on('hashchange', this.hashChange);
  }

  componentWillUnmount() {
    $(window).off('hashchange', this.hashChange);
  }

  _constructMenuData(d, $sections, path) {
    let self = this;
    $sections.each(function () {
      let $section = $(this),
        name = $section.attr('data-name'),
        newPath = path + '/' + name;
      d[name] = {
        name: name,
        path: newPath,
        sections: self._constructMenuData({}, $section.children('.section'), newPath)
      }
    });
    return d;
  }

  /**
   * Recursively search the sections of the current page, building a data structure that will then be used to display
   * the side menu.
   * @returns {*}
   */
  constructMenuData() {
    let $domNode = $(React.findDOMNode(this)),
      $content = $domNode.find('.content'),
      $selectedPage = $content.find('.page[data-selected="true"]'),
      $section = $selectedPage.children('.section');

    console.log('$selectedPage', $selectedPage);

    return this._constructMenuData({}, $section, $selectedPage.attr('data-path'));
  }


}
