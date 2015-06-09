var react = require('react'),
  brio = require('brio');


var SiestaDocumentation = (
  <Brio>
    <BrioMenu/>
    <BrioContent>
      <BrioPage name="Documentation">
        <BrioSection name="Collections">
          <p>
            A collection organises a set of models. For example we could create a collection for organising models that
            represent resources on Github.
          </p>
          <BrioFunction
            name="app.collection"
            params={
              {
                name: {
                  type: 'String',
                  name: 'The name of your collection',
                  optional: false
                }
              }
            }>
              <BrioFunctionExample
                  code={
                     function (done) {
                       var app = siesta.app('My App'),
                         Github = app.collection('Github');

                       done();
                     }
                  }/>
            </BrioFunction>
        </BrioSection>
        <BrioSection>
          <p>
            Serialisation is the process of getting a model instance ready for conversion into a data transfer format
            like JSON e.g. eliminating circular references.
          </p>
          <BrioFunction
            name="ModelInstance.serialise"
            description="Use the serialise function to prepare your instances for use in a data transfer format such as JSON."
            parameters={
              {
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
              }
            }>
            <BrioFunctionExample
              code={
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
            }/>
          </BrioFunction>
        </BrioSection>
      </BrioPage>
      <BrioPage name="Guide">

      </BrioPage>
    </BrioContent>
  </Brio>
);


