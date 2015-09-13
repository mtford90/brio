import React from 'react';

export default class Markdown {
  render() {
    return (
      <div className="markdown">
        {this.props.children}
      </div>
    );
  }
}