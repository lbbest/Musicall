import React, { Component } from "react";
import axios from "axios";

export default class SimilarArtists extends Component {
  state = {
    similarArtists: null,
  };

  componentDidMount() {
    // console.log(this.props.artist);
    let artist = this.props.artist;

    // retrieve similar artists from TasteDive API
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://tastedive.com/api/similar?q=${artist}&type=music&k=377965-Musicall-BCXU1LOW`;
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

  render() {
    const similarArtists = this.state.similarArtists ? (
      <div>
        {this.state.similarArtists.map((similar, index) => {
          return <p key={index}>{similar.Name}</p>;
        })}
      </div>
    ) : (
      <div className="loader"></div>
    );
    return <div>{similarArtists}</div>;
  }
}
