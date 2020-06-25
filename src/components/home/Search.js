import React, { Component } from "react";

export default class Search extends Component {
  constructor() {
    super();
    /*state to hold search query*/
    this.state = {
      search: "",
    };
  }

  /*update state as user inputs search query*/
  handleSearch = (search) => {
    this.setState({ search });
    console.log(search);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          id="search"
          placeholder="Search for an Artist, Album, Song or Genre..."
          /*fires search function upon user input*/
          onChange={(event) => this.handleSearch(event.target.value)}
        ></input>
      </div>
    );
  }
}
