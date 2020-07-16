import React, { Component } from "react";
import Nav from "../components/global/Nav";
import axios from "axios";
import TrackOverview from "../components/track/TrackOverview";
import Lyrics from "../components/track/Lyrics";

export default class Track extends Component {
  state = {
    track: null,
  };

  componentDidMount() {
    // retrieve Spotify artist ID from slug
    let trackID = window.location.pathname.split("/").pop();

    // use artist ID in axios get url
    let url = `https://api.spotify.com/v1/tracks/${trackID}`;
    let header = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")} `,
        "Content-Type": "application/json",
      },
    };

    // axios get request to Spotify API for track
    axios
      .get(url, header)
      .then((res) => {
        // set state for track data
        this.setState({ track: res.data });
        console.log(this.state.track);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const track = this.state.track ? (
      <div className="track-page-container">
        <TrackOverview
          spotifyDetails={this.state.track}
          track={this.state.track.name}
        />
        <Lyrics spotifyDetails={this.state.track} />
      </div>
    ) : (
      <div className="loader"></div>
    );
    return (
      <div>
        <Nav />
        <div className="page-container">{track}</div>
      </div>
    );
  }
}
