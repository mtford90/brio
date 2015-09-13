import React from 'react';
import {Brio, Page, HomePage, SideMenu, Header, Content, Func, Section, Markdown} from 'brio';

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
        <SideMenu/>
        <Content>
          <HomePage>
            <h1>Brio Example</h1>
            <p>Welcome to the example Brio documentation. Choose a page to get started</p>
          </HomePage>
          <Page name='Documentation'>
            <Section name='Something'>
              <Section name='Something Else'>
                <h1>A title</h1>

                <p>This section is about something</p>

                <FuncExample/>
              </Section>
              <Section name='Something Else Again'>
                <h1>ABC</h1>

                <p>123</p>

                <FuncExample/>
              </Section>
            </Section>
            <Section name='Another Thang'>
              <h1>Another Title</h1>

              <p>This section is also about something...</p>
            </Section>
          </Page>
          <Page name='Guide'>

          </Page>
        </Content>
      </Brio>
    )
  }
});

React.render(<SiestaDocumentation/>, document.getElementById('app'));