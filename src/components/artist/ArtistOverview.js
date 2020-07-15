import React, { Component } from "react";
import SpotifyDetails from "./ArtistOverview/SpotifyDetails";
import DiscogDetails from "./ArtistOverview/DiscogDetails";

export default class ArtistOverview extends Component {
  state = {
    spotifyDetails: this.props.spotifyDetails,
    artist: this.props.artist,
  };

  render() {
    return (
      <div
        className="artist-section-container details-container artist-section-top-row"
        id=""
      >
        <SpotifyDetails
          spotifyDetails={this.state.spotifyDetails}
          artist={this.state.artist}
        />
        <DiscogDetails
          spotifyDetails={this.state.spotifyDetails}
          artist={this.state.artist}
        />
      </div>
    );
  }
}
