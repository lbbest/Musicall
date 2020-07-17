import React, { Component } from "react";
import axios from "axios";

export default class Lyrics extends Component {
  state = {
    spotifyDetails: this.props.spotifyDetails,
    lyrics: null,
    notFound: false,
  };
  componentDidMount() {
    let track = this.state.spotifyDetails.name;
    let artist = this.state.spotifyDetails.artists[0].name;

    let url = `https://api.lyrics.ovh/v1/${artist}/${track}`;

    axios
      .get(url)
      .then((res) => {
        // set state for lyric data in HTML form
        this.setState({
          lyrics: `<p>${res.data.lyrics.split("\n").join("</p><p>")}</p>`,
        });
        // console.log(this.state.lyrics);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ notFound: true });
      });
  }
  render() {
    // prints lyrics in HTML form
    const lyrics = this.state.lyrics ? (
      <div
        className="lyrics"
        dangerouslySetInnerHTML={{ __html: this.state.lyrics }}
      ></div>
    ) : this.state.notFound ? (
      <div>
        <p className="no-results">!</p>
        <p className="no-results-text">No lyrics found.</p>
      </div>
    ) : (
      <div className="loader"></div>
    );
    return (
      <div className="lyrics-container">
        <h3>Lyrics:</h3>
        {lyrics}
      </div>
    );
  }
}
