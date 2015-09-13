import React from 'react';
import location from './location';

export default class NavBarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNames: []
    };
  }

  onClick(e) {
    window.location.hash = $(e.target).attr('data-path');
  }

  render() {
    return (
      <ul id="nav-menu">
        {this.state.pageNames.map(function (name) {
          console.log('window.location.hash', window.location.hash);
          let path = '/' + name,
            isSelected = window.location.hash.startsWith('#' + path),
            className = isSelected ? 'active' : '';

          return (
            <li>
              <a data-path={path}
                 data-name={name}
                 data-selected={isSelected}
                 onClick={this.onClick}
                 className={className}>
                {name}
              </a>
            </li>
          );
        }.bind(this))};
      </ul>
    );
  }

  componentDidMount() {
    var domNode = React.findDOMNode(this);
    // HACK: Allow parent element (Brio) to generate a menu based on it's Content child.
    // If there is another way to do this I would love to hear about it.
    domNode.configureMenu = function (pageNames) {
      this.setState({
        pageNames: pageNames
      });
    }.bind(this);
    this.hashChange = () => {this.forceUpdate()};
    $(window).on('hashchange', this.hashChange);
  }

  componentWillUnmount() {
    $(window).off('hashchange', this.hashChange);
  }
}
