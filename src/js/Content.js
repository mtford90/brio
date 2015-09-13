var React = require('react'),
  _ = require('underscore'),
  marked = require('marked');

import {homePageSelected, homePageExists} from './util';
import DefaultHomePage from './DefaultHomePage';

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


var Func = require('./func/Func');



var Content = React.createClass({
  getInitialState: function () {
    return {
      homePageSelected: false
    }
  },
  componentDidMount: function () {
    this.hashChange = () => {
      this.setState({
        homePageSelected: homePageSelected()
      })
    };
    this.hashChange();
    $(window).on('hashchange', this.hashChange);
  },

  componentWillUnmount: function () {
    $(window).off('hashchange', this.hashChange);
  },
  render: function () {
    var homePageSelected = this.state.homePageSelected;
    var className = homePageSelected ? 'home-page-selected' : '';
    return (
      <div className={"content-wrapper " + className}>
        <div className="content">
          {homePageExists() ? '' : <DefaultHomePage/>}
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Content;