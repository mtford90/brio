var React = require('react'),
  _ = require('underscore');

var Func = require('./func/Func'),
  opts = require('./opts');

var App = React.createClass({

  getInitialState: function () {
    var content = opts.content;
    var sectionNames = Object.keys(content),
      currentSectionIndex = 0;
    return {
      sectionNames: sectionNames,
      currentSectionIndex: currentSectionIndex
    }
  },

  selectSection: function (e) {
    var idx = e.target.getAttribute('data-idx');
    this.setState({
      currentSectionIndex: idx
    });
  },
        //<li><a href="guide.html">Guide</a></li>
        //    <li><a href="docs.html"
        //           className="active">Documentation</a></li>
  render: function () {
    var sectionNames = this.state.sectionNames,
      currentSectionIndex = this.state.currentSectionIndex,
      currentSectionName = sectionNames[currentSectionIndex],
      currentSection = opts.content[currentSectionName];

    return (
      <div>
        <div className="header">
          <h1>
            <a href='/'>{opts.title}</a>
          </h1>
          <ul>

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