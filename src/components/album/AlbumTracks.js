import React, { Component } from "react";

export default class AlbumTracks extends Component {
  state = {
    tracks: this.props.spotifyDetails.tracks,
  };
  render() {
    return (
      <table className="album-tracks-container" cellSpacing="0">
        <th>
          <h3>#</h3>
        </th>
        <th>
          <h3>Name:</h3>
        </th>
        <th>
          <h3>Duration:</h3>
        </th>
        <th></th>
        <tbody className="album-tracks">
          {this.state.tracks.items.map((track, index) => {
            // convert ms to mins and secs
            let duration;
            let ms = track.duration_ms,
              min = Math.floor((ms / 1000 / 60) << 0),
              sec = Math.floor((ms / 1000) % 60);
            // if secs < 10, add "0" to make double digit
            duration = min + ":" + (sec < 10 ? "0" + sec : sec);
            return (
              <tr key={index}>
                <td>{track.track_number}.</td>
                <td>{track.name}</td>
                <td>{duration}</td>
                <td>
                  <div className="play-btn">
                    <a
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      &#9658;
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
