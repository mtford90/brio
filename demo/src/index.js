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


var React = require('react');

var {
  Brio,
  Menu,
  Header,
  Content,
  Func,
  Section,
  Markdown
  } = require('brio');


var FuncExample = React.createClass({
  render: function () {
    var def = function (blah) {
        console.log('yo!', blah);
      },
      name = 'foo',
      params = {
        blah: {
          optional: true
        }
      },
      description = 'Does something';

    return <Func name={name}
                 def={def}
                 params={params}
                 description={description}/>
  }
});

var SiestaDocumentation = React.createClass({
  render: function () {
    return (
      <Brio>
        <Header/>
        <Menu/>
        <Content>
          <Section name='Something'>
            <Section name='Something Else'>
              <h1>A title</h1>

              <p>This section is about something</p>

              <Markdown/>
              <FuncExample/>
            </Section>
          </Section>
          <Section name='Another Thang'>
            <h1>Another Title</h1>

            <p>This section is also about something...</p>
            <Markdown/>
          </Section>
        </Content>
      </Brio>
    )
  }
});

React.render(<SiestaDocumentation/>, document.getElementById('app'));