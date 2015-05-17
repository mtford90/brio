var React = require('react');

var queue = require('./queue'),
  FuncLog = require('./FuncLog');


var REGEX_DONE = /done\(\)( *);?\n?/g,
  REGEX_TAB = new RegExp('\t?!\n', 'g'),
  REGEX_CONSOLE_LOG = /console.log\([A-Za-z0-9 +-\\']*\)/g;


var FuncExample = React.createClass({
  componentDidMount: function () {
    this.onRunButtonClicked();
  },
  getInitialState: function () {
    return {
      logs: [],
      numberedLogs: {},
      lineNumbers: true
    }
  },
  parseCode: function (code) {
    var raw = code.toString(),
      split = raw
        //.replace(REGEX_TAB, '')
        //.replace(REGEX_DONE, '')
        .split('\n'),
      numberedLogs = this.state.numberedLogs;

    var elements = [];

    if (split.length) {
      for (var i = 0; i < split.length; i++) {
        var lineNum = i + 1;
        var logs = numberedLogs[lineNum];

        if (logs) {
          var line = split[i];
          var numSubs = logs.length;
          if (numSubs) {
            var l = [];
            var match;
            while ((match = REGEX_CONSOLE_LOG.exec(line)) != null) {
              l.push([match.index, match.index + match[0].length]);
            }
            var cursor = 0;
            var lineElements = [];
            for (var j = 0; j < l.length; j++) {
              var range = l[j];
              var pre = line.slice(cursor, range[0]).replace('	      ', '');
              lineElements.push(<span>{pre}</span>);
              lineElements.push(<FuncLog val={logs[j]}>{line.slice(range[0], range[1])}</FuncLog>);
              cursor = range[1];
            }
            elements.push(
              <div className="line">
                {lineElements}
              </div>
            );
          }
          else {
            split[i] = '<a href="#">' + split[i] + '</a>';
            elements.push(<a href="#">{split[i]}</a>);
          }
        }
        else {
          elements.push(<div className="line">{split[i].replace('	      ', '')}</div>)
        }
      }
      return elements.slice(1, elements.length - 1);
    }

    return elements;
  },
  /**
   * HACK: This is a disgusting, filthy hack to get hold of the line number in the code
   * block from which the console.log originated. This allows us to then patch tooltips
   *
   * Note: This only works in certain browsers. If we detect a failure to get hold of the line number
   * we fall back to display sequential log display, much like javascript dev console.
   * @returns {*}
   */
  getLineNumber: function () {
    var data = printStackTrace();
    console.info('data', data);
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var chrome = row.indexOf('eval at <anonymous>') > -1;
      var firefox = row.indexOf('code') > -1 && row.indexOf('eval') > -1;
      if (chrome || firefox) {
        var split = row.split(':');
        return parseInt(split[split.length - 2]);
      }
      else {
        this.setState({
          lineNumbers: false
        })
      }
    }
  },
  onRunButtonClicked: function () {
    queue.push(function (done) {
      var logs = [];
      var numberedLogs = {};
      var oldConsoleLog = window.console.log;
      var code = this.props.example.code;
      window.console.log = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        logs.push(args);
        var n = this.getLineNumber();
        if (n) {
          if (!numberedLogs[n]) {
            numberedLogs[n] = [];
          }
          numberedLogs[n].push(args);
        }
      }.bind(this);
      var fn;
      eval('fn = ' + code);
      //noinspection JSUnusedAssignment
      fn(function () {
        window.console.log = oldConsoleLog;
        this.setState({
          logs: logs,
          numberedLogs: numberedLogs
        });
        done();
      }.bind(this));
    }.bind(this));

  },
  render: function () {
    var example = this.props.example,
      code = example.code || '',
      func = this.props.func,
      exampleTitle = example.name;

    var parsedCode = this.parseCode(code);

    return (
      <div className="func-example">
        <h3 className="title">
          Example #{this.props.idx + 1}: {exampleTitle}
        </h3>

        <div className="tools">
          <button className="run-button"
                  type="button"
                  onClick={this.onRunButtonClicked}>
            Run
          </button>
        </div>

        <pre className="code">
          {parsedCode}
        </pre>

        <div className="logs">
          <pre>{this.state.logs.map(function (l) {
            return l + '\n';
          })}</pre>
        </div>
      </div>
    )
  }
});


module.exports = FuncExample;