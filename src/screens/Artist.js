import React, { Component } from "react";
import Nav from "../components/global/Nav";
import axios from "axios";
import SimilarArtists from "../components/artist/SimilarArtists";
import ArtistOverview from "../components/artist/ArtistOverview";
import Releases from "../components/artist/Releases";
import Concerts from "../components/artist/Concerts";

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
        Authorization: `Bearer ${sessionStorage.getItem("token")} `,
        "Content-Type": "application/json",
      },
    };

    // axios get request to Spotify API for artist
    axios
      .get(url, header)
      .then((res) => {
        // set state for artist data
        this.setState({ artist: res.data });
        // console.log(this.state.artist);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const artist = this.state.artist ? (
      <div className="artist-page-grid">
        <div className="artist-page-col1">
          <ArtistOverview
            spotifyDetails={this.state.artist}
            artist={this.state.artist.name}
          />
          <Releases artist={this.state.artist.name} />
        </div>
        <div className="artist-page-col2">
          <Concerts artist={this.state.artist.name} />
          <SimilarArtists artist={this.state.artist} />
        </div>
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
