import React from 'react';
import ReactBootstrap, {Accordion, Panel} from 'react-bootstrap';
import FuncDef from './FuncDef';
import FuncDesc from './FuncDesc';
import FuncExample from './FuncExample';

export default class Func extends React.Component {
  render() {
    var {
      name='',
      def,
      params,
      description='',
      examples=[]
      } = this.props;

    return (
      <div className="func">
        <FuncDef name={name} params={params}/>
        <FuncDesc description={description}/>

        <Accordion className="func-examples">
          {examples.map(function (example, idx) {
            var header = <span>Example #{idx + 1}: {example.name}</span>;
            return (
              <Panel header={header} eventKey={idx}>
                <FuncExample example={example}
                             func={func}
                             highlight={this.props.highlight}
                             idx={idx}
                             key={idx}/>
              </Panel>
            );
          }.bind(this))}
        </Accordion>
      </div>
    )
  }
}