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
  getCurrentSectionName: function () {
    var sectionNames = this.getSectionNames();
    return sectionNames[this.state.currentSectionIndex];
  }, getCurrentSection: function () {
    var currentPage = this.getCurrentPage();
    var currentSectionName = this.getCurrentSectionName();
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
            <h1>{this.getCurrentSectionName()}</h1>
            {currentSection.map(function (component, idx) {
              var type = component.type;
              if (type == 'function') {
                return (
                  <div className='component' data-idx={idx}>
                    <Func func={component} key={idx} idx={idx}/>
                  </div>
                );
              }
              else if (type == 'paragraph') {
                return <p>{component.content}</p>
              }
              else if (!type) {
                throw new Error('Components must have a type.');
              }
              else {
                throw new Error('Unknown component type "' + type + '"');
              }
            })}
          </div>
        </div>

      </div>
    )
  }

});

var elem = document.getElementById('app');
React.render(<App/>, elem);
