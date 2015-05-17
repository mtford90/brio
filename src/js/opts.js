var opts =
{
  Serialisation: [
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
            var MyCollection = siesta.collection('MyCollection');

            var MyModel = MyCollection.model({
              name: 'MyModel',
              attributes: ['field1', 'field2']
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
        },
        {
          name: 'Specifying fields again',
          code: function (done) {
            var MyCollection = siesta.collection('MyCollection');

            var MyModel = MyCollection.model({
              name: 'MyModel',
              attributes: ['field1', 'field2']
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