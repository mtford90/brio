var opts =
{
  Serialisation: [
    {
      name: 'ModelInstance.serialise',
      description: 'Use the serialise function to prepare your instances for use in a data transfer format such as JSON.',
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
          description: 'In the below example we explictly specify which fields can be serialised.',
          code: function (done) {
            var MyCollection = siesta.collection('MyCollection');

            var MyModel = MyCollection.model({
              name: 'MyModel',
              attributes: ['field1', 'field2'],
              serialisableFields: ['field1']
            });

            MyModel.graph({
              field1: 1,
              field2: 2
            }).then(function (instance) {
              var serialised = instance.serialise(),
                json = JSON.stringify(serialised, null, 4);
              console.log(json);
              done();
            });
          }
        }
      ]
    }
  ],
  'Other Section': [

  ],
  'And Another Section': [

  ]
};

module.exports = opts;