var React = require('react');

var Menu = React.createClass({
  getInitialState: function () {
    return {
      menu: {}
    }
  },
  renderSection: function (menu) {
    return (
      <ul>
        {Object.keys(menu).map(function (name) {
          var section = menu[name];
          console.log('section', section);
          return (
            <li>
              <a href='#'>{name}</a>
              {Object.keys(section.sections).length ? this.renderSection(section.sections) : ''}
            </li>
          )
        }.bind(this))}
      </ul>
    );
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
      })
    }.bind(this);
  }
});

module.exports = Menu;