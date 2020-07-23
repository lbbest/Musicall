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
      noResultsOn: false,
      pleaseRefresh: false,
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

  // function for handling timer on search input (only fires search once user has stopped typing for 1s)
  typingTimer = () => {
    let interval = 1000;
    // once user hits keyup, resets timer
    clearTimeout(this.identifier);
    this.identifier = setTimeout(() => {
      this.doSearch();
    }, interval);
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
        Authorization: `Bearer ${sessionStorage.getItem("token")} `,
        "Content-Type": "application/json",
      },
    };

    /*make GET request to Spotify API*/
    axios
      .get(url, header)
      .then(
        /*search is loading*/ this.setState({
          noResultsOn: false,
          isLoading: true,
        })
      )
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

        this.setState({ isLoading: false, noResultsOn: true });
        this.setState({ results: resultsArray });
        console.log(this.state);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({ isLoading: false });
          this.setState({ results: [] });
          this.setState({ pleaseRefresh: true });
          sessionStorage.removeItem("token");
        } else if (err.response.status === 400) {
          this.setState({ isLoading: false });
          this.setState({ results: [] });
        }
        console.log(err);
      });
  };

  render() {
    const pleaseRefresh = this.state.pleaseRefresh ? (
      <div>
        <p className="no-results">!</p>
        <p className="no-results-text">
          (401 Request Failed) Please refresh the page.
        </p>
      </div>
    ) : (
      <div></div>
    );
    /*if results are loading, show loading symbol*/
    const isLoading =
      this.state.isLoading && !this.state.pleaseRefresh ? (
        <div className="loader"></div>
      ) : (
        <div></div>
      );
    /*if there are results and not loading, show results*/
    const results =
      this.state.results.length !== 0 &&
      this.state.isLoading === false &&
      this.state.search !== "" ? (
        <div className="search-results">
          {this.state.results.map((result, index) => {
            return <SearchResult key={index} result={result} />;
          })}
          {/* filler divs to set final row of results to flex start */}
          <div className="search-result"></div>
          <div className="search-result"></div>
          <div className="search-result"></div>
          <div className="search-result"></div>
        </div>
      ) : (
        <div></div>
      );
    /*if there are no results, not loading and search term is not empty, show no results*/
    const noResults =
      this.state.isLoading === false &&
      this.state.results.length === 0 &&
      this.state.search !== "" &&
      this.state.noResultsOn === true ? (
        <div>
          <p className="no-results">!</p>
          <p className="no-results-text">No Results</p>
        </div>
      ) : (
        <div></div>
      );
    return (
      <div>
        <div className="search">
          <div className="searchbar-area">
            <p className="search-icon">&#9906;</p>
            <input
              id="searchbar"
              type="text"
              placeholder="Search..."
              autoComplete="off"
              /*fires search function upon user input*/
              onChange={(event) => this.handleSearch(event.target.value)}
              onKeyUp={this.typingTimer}
            ></input>
          </div>
          <div className="filter">
            <label htmlFor="artist" className="checkbox-container">
              Artists
              <input
                type="checkbox"
                className="search-selection"
                name="type"
                value="artist"
                id="artist"
                onChange={(event) => this.handleType(event.target.value)}
                defaultChecked
              ></input>
              <span className="checkbox"></span>
            </label>
            <label htmlFor="album" className="checkbox-container">
              Albums
              <input
                type="checkbox"
                className="search-selection"
                name="type"
                value="album"
                id="album"
                onChange={(event) => this.handleType(event.target.value)}
                defaultChecked
              ></input>
              <span className="checkbox"></span>
            </label>
            <label htmlFor="track" className="checkbox-container">
              Tracks
              <input
                type="checkbox"
                className="search-selection"
                name="type"
                value="track"
                id="track"
                onChange={(event) => this.handleType(event.target.value)}
                defaultChecked
              ></input>
              <span className="checkbox"></span>
            </label>
          </div>
        </div>
        <div className="results-div">
          {pleaseRefresh}
          {isLoading}
          {results}
          {noResults}
        </div>
      </div>
    );
  }
}
