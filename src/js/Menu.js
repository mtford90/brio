var React = require('react');

var Menu = React.createClass({
  getInitialState: function () {
    return {
      menu: {}
    }
  },
  renderSection: function (menu) {
    var location = window.location.hash.slice(1);
    return (
      <ul>
        {Object.keys(menu).map(function (name) {
          var section = menu[name];
          var selected = location.startsWith(section.path);
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
    return (
      <div id="menu-bar" className="menu-bar">
        <div className="menu">
          {this.renderSection(this.state.menu)}
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

    $(window).on('hashchange', this.forceUpdate.bind(this));
  }
});

module.exports = Menu;