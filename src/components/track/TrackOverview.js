import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TrackOverview extends Component {
  state = {
    spotifyDetails: this.props.spotifyDetails,
    track: this.props.track,
  };
  render() {
    const spotifyDetails = this.state.spotifyDetails;
    // convert runtime in ms to minutes and seconds
    let runTime = spotifyDetails.duration_ms;
    // convert ms to mins and secs
    let minutes = Math.floor(runTime / 60000);
    let seconds = ((runTime % 60000) / 1000).toFixed(0);
    runTime =
      // eslint-disable-next-line
      minutes + "mins" + " " + (seconds < 10 ? "0" : "") + seconds + "secs";
    return (
      <div className="album-overview-container">
        <div className="album-img-container">
          {/*if there is a Spotify image render it, otherwise use placeholder*/}
          {spotifyDetails.album.images[0] ? (
            <img src={spotifyDetails.album.images[0].url} alt="album"></img>
          ) : (
            <img
              src="https://static.thenounproject.com/png/29993-200.png"
              alt="album"
            ></img>
          )}
        </div>
        <div className="album-details-container-1">
          {/*render track name*/}
          <h1>{spotifyDetails.name}</h1>
          {/*render artist name*/}
          <p>
            <Link
              to={`/artist/${spotifyDetails.artists[0].id}`}
              className="text-link-dyn"
            >
              {spotifyDetails.artists[0].name}
            </Link>
            <br></br>
            {/*render album name*/}
            <Link
              to={`/album/${spotifyDetails.album.id}`}
              className="text-link-dyn"
            >
              {spotifyDetails.album.name}
            </Link>
          </p>
          {/*render button which opens track in Spotify*/}
          <a
            className="spotify-btn"
            href={spotifyDetails.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Spotify
          </a>
        </div>
        <div className="track-details-container">
          {/*render release date*/}
          <div className="album-released">
            <h3>Released:</h3>
            <p>
              {spotifyDetails.album.release_date.split("-").reverse().join(".")}
            </p>
          </div>
          {/*render run time*/}
          <div className="album-released">
            <h3>Run Time:</h3>
            <p>{runTime}</p>
          </div>
        </div>
      </div>
    );
  }
}
