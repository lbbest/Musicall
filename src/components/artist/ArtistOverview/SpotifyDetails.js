import React, { Component } from "react";

export default class SpotifyDetails extends Component {
  state = {
    spotifyDetails: this.props.spotifyDetails,
  };
  componentDidMount() {
    // console.log(this.state.spotifyDetails);
  }
  render() {
    const spotifyDetails = this.state.spotifyDetails;
    return (
      <div>
        <h1>{spotifyDetails.name}</h1>
        {spotifyDetails.images[0] ? (
          <img src={spotifyDetails.images[0].url} alt="artist"></img>
        ) : (
          <img
            src="https://static.thenounproject.com/png/29993-200.png"
            alt="artist"
          ></img>
        )}
        <a
          className="spotify-btn"
          href={spotifyDetails.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Spotify
        </a>
      </div>
    );
  }
}
