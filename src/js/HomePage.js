import React from 'react';
import location from './location';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let hash = window.location.hash,
      isSelected = hash == '#' || hash == '#/' || hash == '' || hash == '/',
      style = isSelected ? {} : {'display': 'none'};
    return (
      <div className="page home-page"
           data-path="/"
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
