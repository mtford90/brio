import React from 'react';

export default class FuncDesc extends React.Component {
  render() {
    var desc = this.props.description;
    return (
      <p className="func-desc">
        {desc}
      </p>
    );
  }
}