import React, { Component } from "react";
import Nav from "../components/global/Nav";
import axios from "axios";
import AlbumOverview from "../components/album/AlbumOverview";
import AlbumTracks from "../components/album/AlbumTracks";

export default class Album extends Component {
  state = {
    album: null,
  };

  componentDidMount() {
    // retrieve Spotify artist ID from slug
    let albumID = window.location.pathname.split("/").pop();

    // use artist ID in axios get url
    let url = `https://api.spotify.com/v1/albums/${albumID}`;
    let header = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")} `,
        "Content-Type": "application/json",
      },
    };

    // axios get request to Spotify API for album
    axios
      .get(url, header)
      .then((res) => {
        // set state for album data
        this.setState({ album: res.data });
        console.log(this.state.album);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const album = this.state.album ? (
      <div className="album-page-container">
        <AlbumOverview
          spotifyDetails={this.state.album}
          album={this.state.album.name}
        />
        <AlbumTracks spotifyDetails={this.state.album} />
      </div>
    ) : (
      <div className="loader"></div>
    );
    return (
      <div>
        <Nav />
        <div className="page-container">{album}</div>
      </div>
    );
  }
}
