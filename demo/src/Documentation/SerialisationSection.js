var React = require('react'),
  {Section, Function, FunctionExample} = require('brio');

var serialiseFunction = {
  name: 'ModelInstance.serialise',
  params: [
    {
      name: 'model',
      description: 'A siesta model',
      optional: false
    },
    {
      name: 'opts',
      description: 'Options',
      optional: true,
      keys: {
        fields: {
          type: 'Array<String>',
          description: 'which fields to serialise.'
        },
        nullAttributes: {
          type: 'boolean',
          description: 'should null attributes be serialised?'
        },
        nullRelationships: {
          type: 'boolean',
          description: 'should null relationships be serialised?'
        }
      }
    }
  ],
  examples: [
    function (done) {
      var app = siesta.app('My App'),
        MyCollection = app.collection('MyCollection');

      var MyModel = MyCollection.model({
        name: 'MyModel',
        attributes: ['field1', 'field2'],
        serialisableFields: ['field1']
      });

      MyModel.graph({
        field1: 1,
        field2: 2
      }).then(function (instance) {
        var s = siesta.serialiser(MyModel);
        var serialised = s.data(instance),
          json = JSON.stringify(serialised, null, 4);
        console.log(json);
        done();
      });
    }
  ]
};

module.exports = (
  <Section name="Serialisation">
    <p>
      Serialisation is the process of getting a model instance ready for conversion into a data transfer format
      like JSON e.g. eliminating circular references.
    </p>
    <Function opts={serialiseFunction}/>
  </Section>
);