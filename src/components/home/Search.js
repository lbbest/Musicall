import React, { Component } from "react";
import SearchResult from "./SearchResult";
import axios from "axios";

export default class Search extends Component {
  constructor() {
    super();
    /*state to hold search query & type*/
    this.state = {
      search: "",
      type: "artist,album,track",
      results: null,
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
    this.setState(
      {
        type: checkedString,
      },
      this.doSearch
    );
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
        let artistArray = [];
        if (res.data.artists) {
          artistArray = res.data.artists.items;
        }
        let albumArray = [];
        if (res.data.albums) {
          albumArray = res.data.albums.items;
        }
        let trackArray = [];
        if (res.data.tracks) {
          trackArray = res.data.tracks.items;
        }
        let resultsArray = [...artistArray, ...albumArray, ...trackArray];

        this.setState({ results: resultsArray });
        console.log(this.state);
      })
      .catch((err) => {
        this.setState({ results: null });
        console.log(err);
      });
  };

  render() {
    const results = this.state.results ? (
      <div className="search-results">
        {this.state.results.map((result, index) => {
          return <SearchResult key={index} result={result} />;
        })}
      </div>
    ) : (
      <div></div>
    );
    return (
      <div>
        <div className="search">
          <input
            type="text"
            id="search"
            placeholder="Search for an Artist, Album or Track..."
            autoComplete="off"
            /*fires search function upon user input*/
            onChange={(event) => this.handleSearch(event.target.value)}
            onKeyUp={this.doSearch}
          ></input>
          <div>
            <input
              type="checkbox"
              className="search-selection"
              name="type"
              value="artist"
              id="artist"
              onChange={(event) => this.handleType(event.target.value)}
              defaultChecked
            ></input>
            <label htmlFor="artist">Artists</label>
            <input
              type="checkbox"
              className="search-selection"
              name="type"
              value="album"
              id="album"
              onChange={(event) => this.handleType(event.target.value)}
              defaultChecked
            ></input>
            <label htmlFor="album">Albums</label>
            <input
              type="checkbox"
              className="search-selection"
              name="type"
              value="track"
              id="track"
              onChange={(event) => this.handleType(event.target.value)}
              defaultChecked
            ></input>
            <label htmlFor="track">Tracks</label>
          </div>
        </div>
        {results}
      </div>
    );
  }
}
