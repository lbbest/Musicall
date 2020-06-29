import React, { Component } from "react";

export default class SearchResult extends Component {
  render() {
    /*conditionally render image depending on result type*/
    let imageUrl = null;
    if (this.props.result.images) {
      imageUrl = this.props.result.images[1].url;
    } else if (this.props.result.type === "track") {
      imageUrl = this.props.result.album.images[1].url;
    }

    /*conditionally render album type if result is album*/
    let type = null;
    if (this.props.result.type === "album") {
      type = this.props.result.album_type;
    } else {
      type = this.props.result.type;
    }

    return (
      <div>
        <p>{this.props.result.name}</p>
        <img src={imageUrl} alt="cover"></img>
        <p>{type}</p>
      </div>
    );
  }
}
