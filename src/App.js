import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Artist from "./screens/Artist";
import Album from "./screens/Album";
import Song from "./screens/Song";

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

// App component start
class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
    }
  }
  render() {
    const spotifyAuth = this.state.token ? (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/artist" component={Artist} />
          <Route path="/album" component={Album} />
          <Route path="/song" component={Song} />
        </Switch>
      </Router>
    ) : (
      <a
        className="btn btn--loginApp-link"
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
      >
        Login to Spotify
      </a>
    );
    return <div className="App">{spotifyAuth}</div>;
  }
}
export default App;
