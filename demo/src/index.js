//var React = require('react'),
//  {Brio, Menu, Content} = require('brio');
//
//
//var SiestaDocumentation = React.createClass({
//  render: function () {
//    return (
//      <Brio>
//        <Menu/>
//        <Content>
//          {require('./documentation')}
//          {require('./guide')}
//        </Content>
//      </Brio>
//    )
//  }
//});
//
//


var React = require('react'),
    {Brio, Menu} = require('brio');


var SiestaDocumentation = React.createClass({
  render: function () {
    return (
      <Brio>
        <Menu/>
      </Brio>
    )
  }
});



React.render(<SiestaDocumentation/>, document.getElementById('app'));