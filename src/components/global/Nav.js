import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to="/" className="text-link">
          <h3 id="nav-logo">music.all</h3>
        </Link>
        <ul className="nav-link-container">
          {/* <li className="nav-link">Featured</li>
          <li className="nav-link">New Releases</li>
          <li className="nav-link">Blog</li> */}
        </ul>
      </nav>
    );
  }
}
