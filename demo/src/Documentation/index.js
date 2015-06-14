var React = require('react'),
  {Page} = require('brio');


module.exports = (
  <Page name="Documentation">
    {require('./collectionsSection')};
    {require('./serialisationSection')};
  </Page>
);