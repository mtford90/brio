import React from 'react';
import FuncParam from './FuncParam';

export default class FuncDef extends React.Component {
  render() {
    var {
        name,
        params
        } = this.props,
      paramNames = Object.keys(params),
      numParams = paramNames.length;

    return (
      <h3 className="func-def">
        <span className="type">function</span>
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
      </h3>
    )
  }
}