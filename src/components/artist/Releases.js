import React, { Component } from "react";
import axios from "axios";

export default class Releases extends Component {
  state = {
    albums: null,
  };

  componentDidMount() {
    // initialise artist name
    let artist = this.props.artist;

    // initialise url to GET and headers
    let url = `https://api.spotify.com/v1/search?q=${artist}&type=album&limit=50`;
    let header = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")} `,
        "Content-Type": "application/json",
      },
    };

    // get albums from Spotify API
    axios
      .get(url, header)
      .then((res) => {
        // send albums to component state
        this.setState({ albums: res.data.albums.items });
        console.log(this.state.albums);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    // if albums are present render, otherwise show loader
    const albums = this.state.albums ? (
      <div>
        {/*map through albums and render*/}
        {this.state.albums
          .filter((album) => {
            return album.artists[0].name === this.props.artist;
          })
          .map((album, index) => {
            return (
              <div key={index}>
                {album.images[0] ? (
                  <img src={album.images[0].url} alt="album"></img>
                ) : (
                  <img
                    src="https://static.thenounproject.com/png/29993-200.png"
                    alt="album"
                  ></img>
                )}
                <p>{album.name}</p>
                <p>{album.album_type}</p>
                <p>{album.release_date}</p>
              </div>
            );
          })}
      </div>
    ) : (
      <div className="loader"></div>
    );
    return <div>{albums}</div>;
  }
}
