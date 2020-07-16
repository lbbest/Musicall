import React, { Component } from "react";

export default class AlbumOverview extends Component {
  state = {
    spotifyDetails: this.props.spotifyDetails,
    album: this.props.album,
  };

  render() {
    const spotifyDetails = this.state.spotifyDetails;
    // convert runtime in ms to minutes and seconds
    let runTime = 0;
    // loop through tracks and sum track durations (in ms)
    for (let i = 0; i < spotifyDetails.tracks.items.length; i++) {
      runTime += spotifyDetails.tracks.items[i].duration_ms;
    }
    // convert ms to mins and secs
    let minutes = Math.floor(runTime / 60000);
    let seconds = ((runTime % 60000) / 1000).toFixed(0);
    runTime =
      minutes + "mins" + " " + (seconds < 10 ? "0" : "") + seconds + "secs";
    return (
      <div>
        {/*if there is a Spotify image render it, otherwise use placeholder*/}
        {spotifyDetails.images[0] ? (
          <img src={spotifyDetails.images[0].url} alt="album"></img>
        ) : (
          <img
            src="https://static.thenounproject.com/png/29993-200.png"
            alt="album"
          ></img>
        )}
        {/*render album name*/}
        <h1>{spotifyDetails.name}</h1>
        {/*render button which opens album in Spotify*/}
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
        {/*render release date*/}
        <div className="album-released">
          <h3>Released:</h3>
          <p>{spotifyDetails.release_date}</p>
        </div>
        {/*render album genres*/}
        <div className="album-genres">
          <h3>Genre(s):</h3>
          {spotifyDetails.genres.map((genre, index) => {
            return <p key={index}>{genre}</p>;
          })}
        </div>
        {/*render label*/}
        <div>
          <h3>Label:</h3>
          <p>{spotifyDetails.label}</p>
        </div>
        {/*render run time*/}
        <div>
          <h3>Run Time:</h3>
          <p>{runTime}</p>
        </div>
      </div>
    );
  }
}
