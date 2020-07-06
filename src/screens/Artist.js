import React, { Component } from "react";
import Nav from "../components/global/Nav";
import axios from "axios";

export default class Artist extends Component {
  state = {
    artist: null,
  };

  componentDidMount() {
    // retrieve Spotify artist ID from slug
    let artistID = window.location.pathname.split("/").pop();

    // use artist ID in axios get url
    let url = `https://api.spotify.com/v1/artists/${artistID}`;
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")} `,
        "Content-Type": "application/json",
      },
    };

    // axios get request to Spotify API for artist
    axios.get(url, header).then((res) => {
      // set state for artist data
      this.setState({ artist: res.data });
    });
  }

  render() {
    const artist = this.state.artist ? (
      <div>
        <h1>{this.state.artist.name}</h1>
      </div>
    ) : (
      <div className="loader"></div>
    );
    return (
      <div>
        <Nav />
        <div className="page-container">{artist}</div>
      </div>
    );
  }
}
