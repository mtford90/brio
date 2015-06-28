var React = require('react'),
  ReactBootstrap = require('react-bootstrap'),
  Accordion = ReactBootstrap.Accordion,
  Panel = ReactBootstrap.Panel;

var FuncDef = require('./FuncDef'),
  FuncDesc = require('./FuncDesc'),
  FuncExample = require('./FuncExample');

var Func = React.createClass({
  render: function () {
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
});

module.exports = Func;
