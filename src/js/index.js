var React = require('react'),
  _ = require('underscore');

var Func = require('./func/Func');

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
