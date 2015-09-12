import React from 'react';
import NavBarMenu from './NavBarMenu';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1>
          <a href='#'>Brio</a>
        </h1>
        <NavBarMenu/>
      </div>
    );
  }
}