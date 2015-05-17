var React = require('react');

var FuncDef = require('./FuncDef'),
  FuncDesc = require('./FuncDesc'),
  FuncExample = require('./FuncExample');

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

module.exports = Func;
