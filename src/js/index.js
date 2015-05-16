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
        code: function () {
          var x = 1 + 3;
          var n = 5; console.log(x); var m = 8;
          console.log(x + 5);
        }
      }
    ]
  }
];


//var MyCollection = siesta.collection('MyCollection'),
//  MyModel = MyCollection.model('MyModel', {
//    attributes: ['field1', 'field2']
//  });
//
//var s = siesta.serialiser(MyModel, {
//  fields: ['field1']
//});
//
//MyModel.graph({
//  field1: 1,
//  field2: 2
//}, function (instance) {
//  var serialised = s.serialise(instance);
//  console.log(serialised);
//});


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
      split = raw.split('\n'),
      numberedLogs = this.state.numberedLogs;

    var parsed;
    if (split.length) {
      for (var i = 0; i < split.length; i++) {
        var lineNum = i + 1;
        if (numberedLogs[lineNum]) {

          var line = split[i];
          var re = /console.log\([A-Za-z0-9 +-]*\)/;
          var subs = re.exec(line);
          if (subs.length) {
            var cursor = subs.index;
            var sub = subs[0];
            console.log('line', line);
            console.log('subs', subs);
            console.log('cursor', cursor);
            console.log('sub', sub);
            var pre = line.slice(0, cursor);
            var inner = line.slice(cursor, cursor + sub.length);
            var post = line.slice(cursor + sub.length, line.length);
            split[i] = pre + '<a href="#">' + inner + '</a>' + post;
          }
          else {
            split[i] = '<a href="#">' + split[i] + '</a>'
          }
        }
      }

      parsed =
        split
          .splice(1, split.length - 2)
          .join('<br/>')
          .replace(new RegExp('\t|      ', 'g'), '');
    }
    else {
      parsed = raw;
    }
    return parsed;
  },
  /**
   * HACK: This is a disgusting, filthy hack to get hold of the line number in the code
   * block from which the console.log originated. This allows us to then patch in a hyperlink the
   * result of the console.log so that when we hover over we can see the result.
   *
   * Note: This only works in certain browsers. If we detect a failure to get hold of the line number
   * we fall back to display sequential log display, much like javascript dev console.
   * @returns {*}
   */
  getLineNumber: function () {
    var data = printStackTrace();
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var chrome = row.indexOf('code') > -1 && row.indexOf('eval') > -1;
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
        numberedLogs[n] = args;
      }
    }.bind(this);
    var fn;
    eval('fn = ' + code);
    //noinspection JSUnusedAssignment
    fn();
    window.console.log = oldConsoleLog;
    this.setState({
      logs: logs,
      numberedLogs: numberedLogs
    });
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
          {exampleTitle}
        </h3>

        <div className="tools">
          <button className="run-button"
                  type="button"
                  onClick={this.onRunButtonClicked}>
            Run
          </button>
        </div>

        <div className="code" dangerouslySetInnerHTML={{__html: parsedCode}}>
        </div>

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
          {examples.map(function (example) {
            return <FuncExample example={example} func={func}/>
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