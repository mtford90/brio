import React from 'react';
import marked from 'marked';
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


export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homePageSelected: false
    }
  }

  componentDidMount() {
    this.hashChange = () => {
      this.setState({
        homePageSelected: homePageSelected()
      })
    };
    this.hashChange();
    $(window).on('hashchange', this.hashChange);
  }

  componentWillUnmount() {
    $(window).off('hashchange', this.hashChange);
  }

  render() {
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
}

