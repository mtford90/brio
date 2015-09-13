import React from 'react';

//getMarkdown: function (md, idx) {
//  var url = md.url;
//  $.get(url)
//    .success(function (data) {
//      this.state.storage[idx] = marked(data);
//      this.forceUpdate();
//    }.bind(this))
//    .fail(function (jqXHR) {
//      console.error('Error getting markdown at "' + url + '"', jqXHR);
//    });
//},



export default class Markdown {
  render() {
    return (
      <div className="markdown">
        {this.props.children}
      </div>
    );
  }
}