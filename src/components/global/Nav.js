import React, { Component } from "react";

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <p id="nav-logo">music.all</p>
        <ul className="nav-link-container">
          <li className="nav-link">Featured</li>
          <li className="nav-link">New Releases</li>
          <li className="nav-link">Blog</li>
        </ul>
      </nav>
    );
  }
}
