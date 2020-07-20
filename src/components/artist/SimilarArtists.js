import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class SimilarArtists extends Component {
  state = {
    similarArtists: null,
  };

  componentDidMount() {
    // console.log(this.props.artist);
    let artistID = this.props.artist.id;

    let url = `https://api.spotify.com/v1/artists/${artistID}/related-artists`;
    let header = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")} `,
        "Content-Type": "application/json",
      },
    };
    // axios get request to Spotify API for related artists
    axios
      .get(url, header)
      .then((res) => {
        this.setState({ similarArtists: res.data.artists });
        console.log(this.state.similarArtists);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // if similar artists isn't null render, otherwise show loader
    const similarArtists = this.state.similarArtists ? (
      // if there are similar artists render, otherwise show no results
      this.state.similarArtists.length ? (
        <div className="similar-artists-container">
          {/*map through and render similar artists*/}
          {this.state.similarArtists.map((similar, index) => {
            return (
              <Link
                to={`/artist/${similar.id}`}
                key={index}
                className="text-link-dyn"
              >
                {similar.name}
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="no-results">!</p>
          <p className="no-results-text">No similar artists found.</p>
        </div>
      )
    ) : (
      <div className="loader"></div>
    );
    return (
      <div className="artist-section-container">
        <h3>Similar Artists:</h3>
        {similarArtists}
      </div>
    );
  }
}
