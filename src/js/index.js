var React = require('react'),
  _ = require('underscore');

var opts = [
  {
    name: 'siesta.serialise',
    description: 'YoYoYo!',
    parameters: {
      model: {
        type: 'Model',
        description: 'A siesta model',
        optional: false
      },
      opts: {
        type: 'Object',
        description: 'Options',
        optional: true,
        keys: {
          fields: {},
          nullAttributes: {},
          nullRelationships: {}
        }
      }
    },
    examples: [
      {
        name: 'Specifying fields',
        code: function (done) {
          var MyCollection = siesta.collection('MyCollection'),
            MyModel = MyCollection.model('MyModel', {
              attributes: ['field1', 'field2']
            });

          MyModel.graph({
            field1: 1,
            field2: 2
          }).then(function (instance) {
            console.log(instance);
            done();
          });
        }
      }
    ]
  }
];


var FuncParam = React.createClass({
  render: function () {
    var name = this.props.name,
      def = this.props.def;

    return (
      <a href='#'>
        {name}
      </a>
    )
  }
});

var FuncDesc = React.createClass({
  render: function () {
    var desc = this.props.func.description;
    return (
      <div className="func-desc">
        {desc}
      </div>
    );
  }
});

var FuncDef = React.createClass({
  render: function () {
    var func = this.props.func,
      name = func.name,
      params = func.parameters,
      paramNames = Object.keys(params),
      numParams = paramNames.length;

    return (
      <div className="func-def">
        <span className="func-name">{name}</span>
        <span className="left-bracket">(</span>
        {paramNames.map(function (paramName, idx) {
          return (
            <span>
              <FuncParam key={idx} name={paramName} def={params[paramName]}/>
              {idx != (numParams - 1) ? <span className="comma">, </span> : ''}
            </span>
          )
        })}
        <span className="right-bracket">)</span>
      </div>
    )
  }
});

var FuncLog = React.createClass({
  render: function () {
    return (
      <a href="#"
         ref="hyperlink"
         className="log"
         title={this.props.val}>
        {this.props.children}
      </a>
    );
  },
  componentDidMount: function () {
    var $hyperlink = $(this.refs['hyperlink'].getDOMNode());
    $hyperlink.tooltipster({
      theme: 'my-custom-theme',
      position: 'top-right'
    });
  }
});

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
        .replace(new RegExp('\t|      ', 'g'), '')
        .replace(/done\(\)( *);?\n?/g, '')
        .split('\n'),
      numberedLogs = this.state.numberedLogs;

    var elements = [];

    if (split.length) {
      for (var i = 0; i < split.length; i++) {
        var lineNum = i + 1;
        var logs = numberedLogs[lineNum];

        if (logs) {
          var line = split[i];
          var re = /console.log\([A-Za-z0-9 +-\\']*\)/g;
          var numSubs = logs.length;
          if (numSubs) {
            var l = [];
            var match;
            while ((match = re.exec(line)) != null) {
              l.push([match.index, match.index + match[0].length]);
            }
            var cursor = 0;
            var lineElements = [];
            for (var j = 0; j < l.length; j++) {
              var range = l[j];
              var pre = line.slice(cursor, range[0]);
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
          elements.push(<div className="line">{split[i]}</div>)
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
      var chrome = row.indexOf('eval at onRunButtonClicked') > -1;
      if (chrome) {
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
    var oldConsoleLog = window.console.log;
    var logs = [];
    var numberedLogs = {};
    var code = this.props.example.code;
    window.console.log = function customLog() {
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

var Func = React.createClass({
  render: function () {
    var func = this.props.func,
      examples = func.examples || [];

    return (
      <div className="func">
        <FuncDef func={func}/>
        <FuncDesc func={func}/>

        <div className="func-examples">
          {examples.map(function (example, idx) {
            return <FuncExample example={example} func={func} idx={idx} key={idx}/>
          })}
        </div>
      </div>
    )
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Func func={opts[0]}/>
      </div>
    )
  }
});

var elem = document.getElementById('app');
React.render(<App/>, elem);