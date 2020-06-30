import React, { Component } from "react";

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <p id="nav-logo">music.all</p>
        <ul className="nav-link-container">
          <li className="nav-link">About</li>
          <li className="nav-link">Contact</li>
        </ul>
      </nav>
    );
  }
}
