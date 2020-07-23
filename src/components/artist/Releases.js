import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Releases extends Component {
  state = {
    albums: null,
    // original order held in state to reset sort function
    originalAlbumOrder: null,
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
        this.setState({
          albums: res.data.albums.items,
          originalAlbumOrder: res.data.albums.items,
        });
        console.log(this.state.albums);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function to sort releases
  sortReleases = (value) => {
    switch (value) {
      case "date":
        // sort by release date
        const date = [...this.state.albums].sort((a, b) => {
          if (a.release_date > b.release_date) return -1;
          if (a.release_date < b.release_date) return 1;
          return 0;
        });
        this.setState({ albums: date });
        break;
      case "title-az":
        // sort by title a-z
        const titleaz = [...this.state.albums].sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.setState({ albums: titleaz });
        break;
      case "title-za":
        // sort by title z-a
        const titleza = [...this.state.albums].sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
        this.setState({ albums: titleza });
        break;
      case "popularity":
        // sort by popularity
        this.setState({ albums: this.state.originalAlbumOrder });
        break;
      default:
        // sort by popularity/default order from API
        this.setState({ albums: this.state.originalAlbumOrder });
    }
  };

  render() {
    // if albums are present render, otherwise show loader
    const albums = this.state.albums ? (
      <div className="release-container">
        {/*map through albums and render*/}
        {this.state.albums
          .filter((album) => {
            return album.artists[0].name === this.props.artist;
          })
          .map((album, index) => {
            const date = album.release_date;
            const newDate = date
              .split("-")
              .reverse()
              .join(".")
              .substr(date.length - 4);
            return (
              <div className="release" key={index}>
                <Link to={`/album/${album.id}`} className="text-link">
                  {album.images[0] ? (
                    <img
                      className="release-img"
                      src={album.images[0].url}
                      alt="album"
                    ></img>
                  ) : (
                    <img
                      className="release-img"
                      src="https://static.thenounproject.com/png/29993-200.png"
                      alt="album"
                    ></img>
                  )}
                  <div className="release-details">
                    <p>{album.name}</p>
                    <p>{newDate}</p>
                    <p className="release-details-type">{album.album_type}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        {/*filler divs to fill remainder of row*/}
        <div className="release"></div>
        <div className="release"></div>
        <div className="release"></div>
      </div>
    ) : (
      <div className="loader"></div>
    );
    return (
      <div className="artist-section-container">
        <div className="releases-header">
          <h3 className="releases-title">Releases:</h3>
          {/*Dropdown menu for release sorting*/}
          <div className="releases-dropdown">
            <label htmlFor="release-sort">Sort by:</label>
            <select
              id="release-sort"
              onChange={(event) => this.sortReleases(event.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="date">Date</option>
              <option value="title-az">Title (A-Z)</option>
              <option value="title-za">Title (Z-A)</option>
            </select>
          </div>
        </div>
        {albums}
      </div>
    );
  }
}
