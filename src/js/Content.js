var React = require('react'),
  _ = require('underscore'),
  marked = require('marked');


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

var Func = require('./func/Func'),
  Content = React.createClass({
    getInitialState: function () {
      return {
        storage: {}
      }
    },
    componentDidMount: function () {

    },
    render: function () {
      return (
        <div className="content-wrapper">
          <div className="content">
            {this.props.children}
          </div>
        </div>
      )
    }
  });

module.exports = Content;