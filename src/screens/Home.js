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
      <div className="home-page-body">
        <h1 id="home-page-header">music.all</h1>
        <Search />
      </div>
    ) : (
      <div className="home-page-body">
        <h1 id="home-page-header">music.all</h1>
        <a
          className="spotify-btn"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
        >
          Login with Spotify
        </a>
        <p className="spotify-why">Why?</p>
        <div className="info-popout">
          <div></div>
          <p>
            music.all uses Spotify to personalise your experience and allow you
            play music directly from the website
          </p>
        </div>
      </div>
    );
    return (
      <div className="home-page">
        <Nav />
        <div className="home-page-container">{spotifyAuth}</div>
      </div>
    );
  }
}

export default Home;
