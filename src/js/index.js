var React = require('react'),
  _ = require('underscore');

var Func = require('./func/Func'),
  opts = require('./opts');

var App = React.createClass({

  getInitialState: function () {
    return {
      currentPageIndex: 0,
      currentSectionIndex: 0
    }
  },
  getCurrentPage: function () {
    var pages = opts.pages;
    return pages[this.state.currentPageIndex];
  },
  getSectionNames: function () {
    var currentPage = this.getCurrentPage();
    console.log('currentPage', currentPage);
    var content = currentPage.content || {};
    return Object.keys(content);
  },
  getCurrentSection: function () {
    var currentPage = this.getCurrentPage();
    var sectionNames = this.getSectionNames();
    var currentSectionName = sectionNames[this.state.currentSectionIndex];
    var content = currentPage.content || {};
    return content[currentSectionName] || [];
  },
  selectSection: function (e) {
    var idx = e.target.getAttribute('data-idx');
    this.setState({
      currentSectionIndex: idx
    });
  },
  selectPage: function (e) {
    var idx = e.target.getAttribute('data-idx');
    this.setState({
      currentPageIndex: idx,
      currentSectionIndex: 0
    });
  },
  //<li><a href="guide.html">Guide</a></li>
  //    <li><a href="docs.html"
  //           className="active">Documentation</a></li>
  render: function () {
    var sectionNames = this.getSectionNames(),
      currentSectionIndex = this.state.currentSectionIndex,
      currentSection = this.getCurrentSection(),
      pages = opts.pages,
      currentPage = this.getCurrentPage();

    return (
      <div>
        <div className="header">
          <h1>
            <a href='/'>{opts.title}</a>
          </h1>
          <ul>
            {pages.map(function (page, idx) {
              var className = '';
              if (page == currentPage) {
                className += 'active';
              }
              return (
                <li>
                  <a href="#"
                     className={className}
                     key={idx}
                     data-idx={idx}
                     onClick={this.selectPage}>
                    {page.name}
                  </a>
                </li>
              )
            }.bind(this))}
          </ul>
        </div>

        <div className="menu-bar">
          <div className="menu">
            <ul>
              {sectionNames.map(function (sectionName, idx) {
                var isCurrSection = idx == currentSectionIndex;
                return (
                  <li key={idx}>
                    {isCurrSection ? {sectionName} :
                      <a href="#" data-idx={idx} onClick={this.selectSection}>{sectionName}</a>}
                  </li>
                );
              }.bind(this))}
            </ul>
          </div>
        </div>
        <div>
          <div className="content container">
            {currentSection.map(function (func, idx) {
              return <Func func={func} key={idx}/>
            })}
          </div>
        </div>

      </div>
    )
  }

});

var elem = document.getElementById('app');
React.render(<App/>, elem);