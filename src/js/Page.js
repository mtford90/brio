import React from 'react';
import location from './location';

export default class Page extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let name = this.props.name,
      path = '/' + name,
      isSelected = window.location.hash.startsWith('#' + path),
      style = isSelected ? {} : {'display': 'none'};
    return (
      <div className="page"
           data-name={name}
           data-selected={isSelected}
           style={style}>
        {this.props.children}
      </div>
    )
  }

  componentDidMount() {
    this.hashChange = () => {this.forceUpdate()};
    $(window).on('hashchange', this.hashChange);
  }

  componentWillUnmount() {
    $(window).off('hashchange', this.hashChange);
  }
}
