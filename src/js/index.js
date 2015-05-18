var React = require('react'),
  _ = require('underscore');

var Func = require('./func/Func'),
  opts = require('./opts');

var Menu = React.createClass({
  render: function () {
    var sectionNames = [];
    //
//
//<ul>
//          {sectionNames.map(function (sectionName, idx) {
//            var isCurrSection = idx == currentSectionIndex;
//            return (
//              <li key={idx}>
//                {isCurrSection ? {sectionName} :
//                  <a data-idx={idx}
//                     data-section-name={sectionName}
//                     onClick={this.selectSection}>
//                    {sectionName}
//                  </a>}
//              </li>
//            );
//          }.bind(this))}
//        </ul>

    return (
      <div className="menu-bar">
        <div className="menu">

        </div>
      </div>
    )
  }
});

var Content = React.createClass({
  render: function () {
    //<h1>{this.getCurrentSectionName()}</h1>
    //{currentSection.map(function (component, idx) {
    //  var type = component.type;
    //  if (type == 'function') {
    //    return (
    //      <div className='component' data-idx={idx}>
    //        <Func func={component} key={idx} idx={idx}/>
    //      </div>
    //    );
    //  }
    //  else if (type == 'paragraph') {
    //    return <p>{component.content}</p>
    //  }
    //  else if (!type) {
    //    throw new Error('Components must have a type.');
    //  }
    //  else {
    //    throw new Error('Unknown component type "' + type + '"');
    //  }
    //})}
    return (
      <div className="content container">
      </div>
    )
  }
});

var App = React.createClass({
  getPageNames: function () {
    return Object.keys(opts.pages);
  },
  componentDidMount: function () {
    console.log(window.location.hash);
    window.onhashchange = function () {
      var pageName = this.getPageNameFromHash();
      this.setState({
        pageName: pageName
      });
    }.bind(this);
  },
  getPageNameFromHash: function () {
    var hash = window.location.hash.replace('#', '');
    var hierarchy = hash.split('/').slice(1);
    var pageName = hierarchy[0];
    if (!pageName) {
      var pageNames = Object.keys(opts.pages);
      pageName = pageNames[0];
    }
    return pageName;
  },
  getInitialState: function () {
    var pageName = this.getPageNameFromHash();
    return {
      pageName: pageName
    };
  },
  render: function () {

    var pages = opts.pages,
      currentPageName = this.state.pageName,
      pageNames = Object.keys(pages);

    return (
      <div>
        <div className="header">
          <h1>
            <a href='#'>{opts.title}</a>
          </h1>
          <ul>
            {Object.keys(pages).map(function (pageName, idx) {
              var page = opts.pages[pageName];
              var className = '';
              if (pageName == currentPageName) {
                className += 'active';
              }
              return (
                <li>
                  <a href={'/#/' + pageName}
                     className={className}
                     key={idx}
                     data-idx={idx}
                     data-page-name={pageName}>
                    {pageName}
                  </a>
                </li>
              )
            }.bind(this))}
          </ul>
        </div>

        <Menu/>

        <div>
          <Content/>
        </div>

      </div>
    )
  }

});


var elem = document.getElementById('app');
React.render(<App/>, elem);
