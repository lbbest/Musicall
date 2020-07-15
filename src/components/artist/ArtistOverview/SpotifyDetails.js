import React, { Component } from "react";

export default class SpotifyDetails extends Component {
  state = {
    spotifyDetails: this.props.spotifyDetails,
  };
  render() {
    const spotifyDetails = this.state.spotifyDetails;
    return (
      <div className="spotify-details-container">
        {/*if there is a Spotify image render it, otherwise use placeholder*/}
        {spotifyDetails.images[0] ? (
          <img
            className="spotify-details-img"
            src={spotifyDetails.images[0].url}
            alt="artist"
          ></img>
        ) : (
          <img
            className="spotify-details-img"
            src="https://static.thenounproject.com/png/29993-200.png"
            alt="artist"
          ></img>
        )}
        {/*render artist name*/}
        <h1 className="spotify-details-title">{spotifyDetails.name}</h1>
        {/*render button which opens artist in Spotify*/}
        <div className="spotify-details-btn">
          <a
            className="spotify-btn"
            href={spotifyDetails.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Spotify
          </a>
        </div>
      </div>
    );
  }
}
