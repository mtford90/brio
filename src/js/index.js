var React = require('react'),
  _ = require('underscore'),
  marked = require('marked');

var Menu = require('./Menu'),
  Content = require('./Content'),
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
        <ul>
        </ul>
      </div>
    );
  }
});




module.exports = window.brio = {
  Brio: Brio,
  Menu: Menu,
  Content: Content,
  Markdown: Markdown,
  Section: Section,
  Header: Header,
  Func: require('./func/Func')
};