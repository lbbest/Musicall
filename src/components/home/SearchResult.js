import React, { Component } from "react";

export default class SearchResult extends Component {
  render() {
    /*conditionally render image depending on result type*/
    let imageUrl = null;

    switch (this.props.result.type) {
      case "artist":
        if (
          this.props.result.images === undefined ||
          this.props.result.images.length === 0
        ) {
          imageUrl = "https://static.thenounproject.com/png/29993-200.png";
        } else {
          imageUrl = this.props.result.images[0].url;
        }
        break;
      case "album":
        if (
          this.props.result.images === undefined ||
          this.props.result.images.length === 0
        ) {
          imageUrl = "https://static.thenounproject.com/png/29993-200.png";
        } else {
          imageUrl = this.props.result.images[0].url;
        }
        break;
      case "track":
        if (
          this.props.result.album === undefined ||
          this.props.result.album.images === undefined ||
          this.props.result.album.images.length === 0
        ) {
          imageUrl = "https://static.thenounproject.com/png/29993-200.png";
        } else {
          imageUrl = this.props.result.album.images[0].url;
        }
        break;
      default:
        imageUrl = "https://static.thenounproject.com/png/29993-200.png";
        break;
    }

    /*conditionally render album type if result is album*/
    let type = null;
    if (this.props.result.type === "album") {
      type = this.props.result.album_type;
    } else if (this.props.result.type === "track") {
      type = this.props.result.type;
    }

    /*conditionally render album/track artist*/
    let objectArtist = null;
    if (this.props.result.type === "album") {
      objectArtist = this.props.result.artists[0].name;
    } else if (this.props.result.type === "track") {
      objectArtist = this.props.result.album.artists[0].name;
    } else if (this.props.result.type === "artist") {
      objectArtist = this.props.result.type;
    }

    return (
      <div className="search-result">
        <img src={imageUrl} alt="cover" className="search-result-img"></img>
        <div className="search-result-info">
          <div>
            <p className="search-result-title">{this.props.result.name}</p>
            <p className="search-result-subtitle">{objectArtist}</p>
          </div>
          <p className="search-result-type">{type}</p>
        </div>
      </div>
    );
  }
}
