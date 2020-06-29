import React, { Component } from "react";

export default class SearchResult extends Component {
  render() {
    /*conditionally render image depending on result type*/
    let imageUrl = null;
    if (
      (this.props.result.images === undefined ||
        this.props.result.images.length === 0) &&
      this.props.result.type !== "track"
    ) {
      imageUrl = "#";
    } else if (this.props.result.images) {
      imageUrl = this.props.result.images[1].url;
    } else if (
      (this.props.result.images === undefined ||
        this.props.result.images.length === 0) &&
      this.props.result.type === "track"
    ) {
      imageUrl = this.props.result.album.images[1].url;
    }

    /*conditionally render album type if result is album*/
    let type = null;
    if (this.props.result.type === "album") {
      type = this.props.result.album_type;
    } else {
      type = this.props.result.type;
    }

    /*conditionally render album/track artist*/
    let objectArtist = null;
    if (this.props.result.type === "album") {
      objectArtist = " - " + this.props.result.artists[0].name;
    } else if (this.props.result.type === "track") {
      objectArtist = " - " + this.props.result.album.artists[0].name;
    }
    return (
      <div>
        <p>
          {this.props.result.name}
          {objectArtist}
        </p>
        <img src={imageUrl} alt="cover"></img>
        <p>{type}</p>
      </div>
    );
  }
}
