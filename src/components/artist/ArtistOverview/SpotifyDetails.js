import React, { Component } from "react";

export default class SpotifyDetails extends Component {
  state = {
    spotifyDetails: this.props.spotifyDetails,
  };
  componentDidMount() {
    console.log(this.state.spotifyDetails);
  }
  render() {
    return <div></div>;
  }
}
