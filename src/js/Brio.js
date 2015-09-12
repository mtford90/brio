var React = require('react');

import SideMenu from './SideMenu';

var Brio = React.createClass({
  getInitialState: function () {
    return {}
  },
  render: function () {
    return (
      <div className="brio">
        {this.props.children}
      </div>
    )
  },
  componentDidMount: function () {
    // Fake hashchange event so that the sections can configure themselves.
    var menuData = this.constructMenu();
    var menuBar = $(this.getDOMNode()).find('#menu-bar')[0];
    menuBar.configureMenu(menuData);
  },
  _constructMenu: function (d, $sections, path) {
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
  },
  constructMenu: function () {
    var $domNode = $(this.getDOMNode()),
      $content = $domNode.find('.content'),
      $section = $content.children('.section');

    return this._constructMenu({}, $section, '');
  }
});

module.exports = Brio;