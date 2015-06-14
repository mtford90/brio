var React = require('react'),
  {Section, Function, FunctionExample} = require('brio');

var collectionFunction = {
  name: 'app.collection',
  params: [
    {
      name: 'name',
      type: 'String',
      description: 'The name of your collection',
      optional: false
    }
  ],
  examples: [
    function (done) {
      var app = siesta.app('My App'),
        Github = app.collection('Github');

      done();
    }
  ]
};

module.exports = (
  <Section name="Collections">
    <p>
      A collection organises a set of models. For example we could create a collection for organising models that
      represent resources on Github.
    </p>
    <Function opts={collectionFunction}/>
  </Section>
);