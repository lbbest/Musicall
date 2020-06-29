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
      results: [],
      isLoading: false,
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
    /*search is loading*/
    this.setState({ isLoading: true });

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

        this.setState({ isLoading: false });
        this.setState({ results: resultsArray });
        console.log(this.state);
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        this.setState({ results: [] });
        console.log(err);
      });
  };

  render() {
    /*if results are loading, show loading symbol*/
    const isLoading = this.state.isLoading ? <p>LOADING...</p> : <div></div>;
    /*if there are results and not loading, show results*/
    const results =
      this.state.results && this.state.isLoading === false ? (
        <div className="search-results">
          {this.state.results.map((result, index) => {
            return <SearchResult key={index} result={result} />;
          })}
        </div>
      ) : (
        <div></div>
      );
    /*if there are no results, not loading and search term is not empty, show no results*/
    const noResults =
      this.state.isLoading === false &&
      this.state.results.length === 0 &&
      this.state.search !== "" ? (
        <p>No Results</p>
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
        {isLoading}
        {results}
        {noResults}
      </div>
    );
  }
}
