import React from 'react';

export default class FuncLog extends React.Component {
  render() {
    return (
      <a href="#"
         ref="hyperlink"
         className="log highlighted-tooltip"
         dangerouslySetInnerHTML={{__html: this.props.highlight(this.props.content)}}/>
    );
  }

  componentDidMount() {
    var $hyperlink = $(React.findDOMNode(this.refs['hyperlink']));
    $hyperlink.tooltipster({
      theme: 'my-custom-theme',
      position: 'top-right',
      content: $('<pre>' + this.props.val + '</pre>')
    });
  }
}