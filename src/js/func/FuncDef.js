var React = require('react');

var FuncParam = require('./FuncParam');

console.log('FuncParam', FuncParam);

var FuncDef = React.createClass({
  render: function () {
    var func = this.props.func,
      name = func.name,
      params = func.parameters,
      paramNames = Object.keys(params),
      numParams = paramNames.length;

    return (
      <h2 className="func-def">

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
      </h2>
    )
  }
});

module.exports = FuncDef;
