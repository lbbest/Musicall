import React, { Component } from "react";
import axios from "axios";

export default class DiscogDetails extends Component {
  state = {
    discogsDetails: null,
  };
  componentDidMount() {
    // console.log(this.state.spotifyDetails);
    let artist = this.props.artist;
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
            console.log(this.state.discogsDetails);
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
    return <div></div>;
  }
}
