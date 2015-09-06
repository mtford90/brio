var React = require('react');

var location = require('./location.js');


var Menu = React.createClass({
  getInitialState: function () {
    return {
      menu: {}
    }
  },
  resolve: function (section) {
    var subSectionNames = Object.keys(section.sections);
    while (subSectionNames.length) {
      var sections = section.sections;
      if (sections) {
        section = sections[subSectionNames[0]];
        subSectionNames = Object.keys(section.sections);
      }
      else {
        subSectionNames = [];
      }
    }
    return section;
  },

  renderSection: function (menu) {
    return (
      <ul>
        {Object.keys(menu).map(function (name) {
          var section = menu[name];
          var selected = location.pathSelectedExactly(section.path);
          return (
            <li>
              {selected ? {name} : <a data-name={name} data-path={section.path} onClick={this.onClick}>{name}</a>}
              {Object.keys(section.sections).length ? this.renderSection(section.sections) : ''}
            </li>
          )
        }.bind(this))}
      </ul>
    );
  },
  onClick: function (e) {
    window.location.hash = $(e.target).attr('data-path');
  },
  render: function () {
    var menu = this.state.menu;
    return (
      <div id="menu-bar" className="menu-bar">
        <div className="menu">
          {this.renderSection(menu)}
        </div>
      </div>
    )
  },
  componentDidMount: function () {
    var domNode = this.getDOMNode();
    // HACK: Allow parent element (Brio) to generate a menu based on it's Content child.
    // If there is another way to do this I would love to hear about it.
    domNode.configureMenu = function (menu) {
      this.setState({
        menu: menu
      });
    }.bind(this);

    $(window).on('hashchange', function () {
      this.forceUpdate();
    }.bind(this));
  }
});

module.exports = Menu;