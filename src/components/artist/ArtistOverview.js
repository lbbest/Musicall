import React, { Component } from "react";
import axios from "axios";

export default class ArtistOverview extends Component {
  // Discogs key and secret
  // key=kcUMFBATWtESplGaZWOv&secret=hAGJairZCyulLzQnTFBylAeyqeTAPosI
  state = {
    spotifyDetails: this.props.spotifyDetails,
    discogsDetails: null,
  };

  componentDidMount() {
    // console.log(this.state.spotifyDetails);
    let artist = this.state.spotifyDetails.name;
    // console.log(artist);

    let discogsArtistID = null;
    let idUrl = `https://api.discogs.com/database/search?q=${artist}&type=artist&key=kcUMFBATWtESplGaZWOv&secret=hAGJairZCyulLzQnTFBylAeyqeTAPosI`;

    // axios get request to Discogs API for discogs artist ID
    axios
      .get(idUrl)
      .then((res) => {
        discogsArtistID = res.data.results[0].id;
      })
      .then(() => {
        // axios get request to Discogs API for artist object
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = `https://api.discogs.com/artists/${discogsArtistID}`;
        axios
          .get(proxyurl + url)
          .then((res) => {
            this.setState({ discogsDetails: res.data });
            console.log(this.state);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let spotifyDetails = this.state.spotifyDetails;
    let discogsDetails = this.state.discogsDetails;
    const details =
      this.state.spotifyDetails && this.state.discogsDetails ? (
        <div>
          <h1>{spotifyDetails.name}</h1>
          {spotifyDetails.images[0] && (
            <img src={spotifyDetails.images[0].url} alt="artist image"></img>
          )}
          {
            /*conditionally render profile if artist name is included (to catch false profiles)*/
            discogsDetails.name.match(spotifyDetails.name) && (
              <p>{discogsDetails.profile}</p>
            )
          }
          <a
            className="spotify-btn"
            href={spotifyDetails.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Spotify
          </a>
          <div>
            {spotifyDetails.genres.map((genre, index) => {
              return <p key={index}>{genre}</p>;
            })}
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      );
    return <div>{details}</div>;
  }
}
