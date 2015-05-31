var React = require('react'),
  ReactBootstrap = require('react-bootstrap'),
  Panel = ReactBootstrap.Panel,
  Row = ReactBootstrap.Row,
  Col = ReactBootstrap.Col;

var queue = require('./queue'),
  FuncLog = require('./FuncLog');


var REGEX_DONE = /\t* *done\(\)( *);?/g,
  REGEX_TAB = new RegExp('\t?!\n', 'g'),
  REGEX_CONSOLE_LOG = /console.log\([A-Za-z0-9 +-\\']*\)/g;


var FuncExample = React.createClass({
  componentDidMount: function () {
    var code = this.props.example.code;
    this.execute(code);
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
        .replace(REGEX_DONE, '')
        .split('\n'),
      numberedLogs = this.state.numberedLogs;


    var highlight = this.props.highlight || function (c) {return c};

    var elements = [];

    if (split.length) {
      var replace = '';
      var firstLineIdx = 1;
      var firstLine = split[firstLineIdx];
      while (!firstLine.trim().length) {
        firstLineIdx++;
        firstLine = split[firstLineIdx];
      }


      console.log('firstLine', firstLine);

      for (i = 0; i < firstLine.length; i++) {
        var char = firstLine[i];
        console.log('char', '$' + char + '$');
        if (char == ' ' || char == '\t') {
          replace += char;
        }
        else {
          break;
        }
      }

      console.log('replace', replace);

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
              var pre = line.slice(cursor, range[0]).replace(new RegExp(replace), '');
              html = highlight(pre);
              lineElements.push(<span dangerouslySetInnerHTML={{__html: html}}/>);
              lineElements.push((
                <FuncLog val={logs[j]}
                         highlight={highlight}
                         content={line.slice(range[0], range[1])}/>
              ));
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
          var html = highlight(split[i].replace(replace, ''));
          elements.push(<div className="line"
                             dangerouslySetInnerHTML={{__html: html}}/>)
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
    }
  },
  execute: function (code) {
    queue.push(function (done) {
      var logs = [];
      var numberedLogs = {};
      var oldConsoleLog = window.console.log;
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
        else if (n === undefined) {
          this.setState({
            lineNumbers: false
          })
        }
      }.bind(this);
      var fn;
      eval('fn = ' + code);
      try {
        //noinspection JSUnusedAssignment
        fn(function () {
          window.console.log = oldConsoleLog;
          this.setState({
            logs: logs,
            numberedLogs: numberedLogs
          });
          done();
        }.bind(this));
      }
      catch (e) {
        console.error(e);
      }
    }.bind(this));

  },
  render: function () {
    var example = this.props.example,
      code = example.code || '';

    var parsedCode = this.parseCode(code);

    return (
      <div className="func-example"
           eventKey={this.props.idx}>
        {
          example.description ?
            (
              <Row>
                <Col>
                  <p>{example.description}</p>
                </Col>
              </Row>
            ) : ''
        }
        <Row>
          <Col md="9">
            <h4>Code</h4>
          </Col>
          <Col md="3" className="logs">
            <h4>Output</h4>
          </Col>
        </Row>
        <Row>
          <Col md="9">
            <pre className="code"><code className="lang-js">{parsedCode}</code></pre>
          </Col>
          <Col md="3" className="logs">
            <pre>{this.state.logs.map(function (l) {
              return l + '\n';
            })}</pre>
          </Col>
        </Row>


      </div>
    )
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.example != this.props.example) {
      this.setState({
        logs: [],
        numberedLogs: {},
        lineNumbers: true
      }, function () {
        var code = nextProps.example.code;
        this.execute(code);
      }.bind(this));
    }
  }
});


module.exports = FuncExample;
