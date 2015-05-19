var React = require('react'),
  _ = require('underscore');

var Func = require('./func/Func'),
  opts = require('./opts');

var Menu = React.createClass({
  _renderSection: function (path, section) {
    if (_.isArray(section)) {
      return ''
    }
    else {
      var sectionNames = Object.keys(section);
      return (
        <ul>
          {sectionNames.map(function (name) {
            var href = path + '/' + name;
            var hash = window.location.hash;
            var isActive = href == ('/' + hash);
            return [
              (
                <li>
                  {isActive ? {name} : <a href={href}>{name}</a>}
                </li>
              ),
              this._renderSection(href, section[name])
            ];
          }.bind(this))}
        </ul>
      )
    }
  },
  render: function () {
    return (
      <div className="menu-bar">
        <div className="menu">
          {this._renderSection('/#/' + this.props.pageName, this.props.page)}
        </div>
      </div>
    )
  }
});

var Breadcrumbs = React.createClass({
  render: function () {
    var hierarchy = this.props.hierarchy;
    var href = '/#/' + hierarchy[0];
    return (
      <div className="breadcrumbs">
         <ul >
        {hierarchy.slice(1, hierarchy.length - 1).map(function (section) {
          href += '/' + section;
          return <li><a href={hrefgi}>{section}</a></li>
        })}
      </ul>
        </div>

    );
  }
});

var Content = React.createClass({
  render: function () {
    var {section, sectionName} = this.props;


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
      <div className="content">
        <h1>{sectionName}</h1>
      </div>
    )
  }
});

var App = React.createClass({
  getPageNames: function () {
    return Object.keys(opts.pages);
  },
  componentDidMount: function () {
    window.onhashchange = function () {
      this.setState({
        hierarchy: this._constructHierarchy()
      })
    }.bind(this);
  },
  _constructHierarchy: function () {
    return window.location.hash.replace('#', '').split('/').slice(1);
  },
  getInitialState: function () {
    return {
      hierarchy: this._constructHierarchy()
    };
  },
  getCurrPageName: function () {
    return this.state.hierarchy[0] || Object.keys(opts.pages)[0];
  },
  getCurrSection: function () {
    var section = opts.pages[this.getCurrPageName()];
    console.log('section', section);
    var hierarchy = this.state.hierarchy;
    hierarchy
      .slice(1)
      .forEach(function (sectionName) {
        section = section[sectionName];
      });
    return section;
  },
  getCurrSectionName: function () {
    var hierarchy = this.state.hierarchy;
    if (hierarchy.length) {
      return hierarchy[hierarchy.length - 1];
    }
    else {
      return this.getCurrPageName();
    }
  },
  render: function () {
    var pages = opts.pages,
      currentPageName = this.getCurrPageName(),
      page = pages[currentPageName];

    return (
      <div>
        <div className="header">
          <h1>
            <a href='#'>{opts.title}</a>
          </h1>
          <ul>
            {Object.keys(pages).map(function (pageName, idx) {
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

        <Menu page={page} pageName={currentPageName}/>


        <div className="content-wrapper">
            <Breadcrumbs hierarchy={this.state.hierarchy} pageName={currentPageName}/>
            <Content section={this.getCurrSection()} sectionName={this.getCurrSectionName()}/>
        </div>

      </div>
    )
  }

});


var elem = document.getElementById('app');
React.render(<App/>, elem);
