var React = require('react'),
  _ = require('underscore'),
  marked = require('marked');

var SideMenu = require('./SideMenu'),
  Content = require('./Content'),
  NavBarMenu = require('./NavBarMenu'),
  Brio = require('./Brio'),
  Section = require('./Section'),
  Markdown = require('./Markdown');


var Header = React.createClass({
  render: function () {
    return (
      <div className="header">
        <h1>
          <a href='#'>Brio</a>
        </h1>
        <NavBarMenu/>
      </div>
    );
  }
});

module.exports = window.brio = {
  Brio: Brio,
  SideMenu: SideMenu,
  Content: Content,
  Markdown: Markdown,
  Section: Section,
  Header: Header,
  Func: require('./func/Func')
};