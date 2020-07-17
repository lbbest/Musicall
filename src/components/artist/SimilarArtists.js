import React, { Component } from "react";
import axios from "axios";

export default class SimilarArtists extends Component {
  state = {
    similarArtists: null,
  };

  componentDidMount() {
    // console.log(this.props.artist);
    let artist = this.props.artist.name;

    // retrieve similar artists from TasteDive API
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://tastedive.com/api/similar?q=${artist}&type=music&limit=50&k=377965-Musicall-BCXU1LOW`;
    axios
      .get(proxyurl + url)
      .then((res) => {
        // console.log(res);
        this.setState({ similarArtists: res.data.Similar.Results });
        // console.log(this.state.similarArtists);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  similarArtistRedirect(artist) {
    let url = `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`;
    let header = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")} `,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(url, header)
      .then((res) => {
        console.log(res);
        window.location.href = `/artist/${res.data.artists.items[0].id}`;
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
              <p
                key={index}
                onClick={() => {
                  this.similarArtistRedirect(similar.Name);
                }}
                className="text-link-dyn"
              >
                {similar.Name}
              </p>
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
