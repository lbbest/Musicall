import React, { Component } from "react";
import axios from "axios";

export default class Search extends Component {
  constructor() {
    super();
    /*state to hold search query & type*/
    this.state = {
      search: "",
      type: "artist,album,track",
    };
  }

  /*update state as user inputs search query*/
  handleSearch = (term) => {
    this.setState({ search: term });
  };

  /*update state as user selects search type*/
  handleType = () => {
    let selection = document.getElementsByClassName("search-selection");
    let checked = [];
    for (let i = 0; selection[i]; i++) {
      if (selection[i].checked) {
        checked.push(selection[i].value);
      }
    }

    let checkedString = checked.join();
    this.setState({
      type: checkedString,
    });
  };

  /*axios GET request to Spotify API to get search results*/
  doSearch = () => {
    /*assign search variables*/
    let search = this.state.search;
    let type = this.state.type;

    /*assign GET request variables inc. search variables and API token*/
    let url = `https://api.spotify.com/v1/search?q=${search}&type=${type}&limit=50`;
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")} `,
        "Content-Type": "application/json",
      },
    };

    /*make GET request to Spotify API*/
    axios
      .get(url, header)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          id="search"
          placeholder="Search for an Artist, Album or Song..."
          /*fires search function upon user input*/
          onChange={(event) => this.handleSearch(event.target.value)}
        ></input>
        <button onClick={this.doSearch}>
          <p className="search-icon">&#9906;</p>
        </button>
        <div>
          <input
            type="checkbox"
            className="search-selection"
            name="type"
            value="artist"
            onChange={(event) => this.handleType(event.target.value)}
            defaultChecked
          ></input>
          <label htmlFor="artist">Artists</label>
          <input
            type="checkbox"
            className="search-selection"
            name="type"
            value="album"
            onChange={(event) => this.handleType(event.target.value)}
            defaultChecked
          ></input>
          <label htmlFor="album">Albums</label>
          <input
            type="checkbox"
            className="search-selection"
            name="type"
            value="track"
            onChange={(event) => this.handleType(event.target.value)}
            defaultChecked
          ></input>
          <label htmlFor="song">Songs</label>
        </div>
      </div>
    );
  }
}
