import React, { Component } from "react";
import Nav from "../components/global/Nav";
import Search from "../components/home/Search";

export const authEndpoint = "https://accounts.spotify.com/authorize";
// Set clientID and redirectUri for call to Spotify API
const clientId = "03d5e0960c054d4996f568580a8069f3";
const redirectUri = "http:%2F%2Flocalhost:3000/";
// const scopes = ["user-read-currently-playing", "user-read-playback-state"]; CAN ADD SCOPES BY ADDING "&scope=${scopes.join("%20")}" TO HREF
// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
    };
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      localStorage.setItem("token", _token);
    }
  }

  render() {
    const spotifyAuth = localStorage.getItem("token") ? (
      <div>
        <p>
          Use the search bar below to find your favourite music or discover
          something new!
        </p>
        <Search />
      </div>
    ) : (
      <div>
        <p>Please connect to your Spotify account using the button below.</p>
        <a
          className="spotifyAuth-btn"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
        <p>Why?</p>
      </div>
    );
    return (
      <div>
        <Nav />
        <h1>music.all</h1>
        {spotifyAuth}
      </div>
    );
  }
}

export default Home;
