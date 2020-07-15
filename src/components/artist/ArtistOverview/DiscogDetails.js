import React, { Component } from "react";
import axios from "axios";

export default class DiscogDetails extends Component {
  state = {
    discogsDetails: null,
  };
  componentDidMount() {
    let artist = this.props.artist;

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
            // send discogs data to state for use in component
            this.setState({ discogsDetails: res.data });
            // console.log(this.state.discogsDetails);
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
    // if discogsDetails is not null render, otherwise show loader
    const discogsDetails = this.state.discogsDetails ? (
      // if the artist name from spotify and discogs match render data, otherwise do not display to avoid false matches between data
      this.state.discogsDetails.name.match(this.props.spotifyDetails.name) ? (
        <div className="discogs-details-container">
          {/*discogs profile div*/}
          <div className="discogs-details-profile-container">
            <h3>Profile:</h3>
            <p>{this.state.discogsDetails.profile}</p>
          </div>
          <div className="discogs-details-sec-container">
            {/*div that renders either artist real name or band member names*/}
            <div className="discogs-details-member-container">
              {this.state.discogsDetails.realname && <h3>Real name:</h3>}
              <p>{this.state.discogsDetails.realname}</p>
              {this.state.discogsDetails.members && <h3>Active Members:</h3>}
              {/*filters members and returns only active members, then maps through each active member*/}
              {this.state.discogsDetails.members &&
                this.state.discogsDetails.members
                  .filter((members) => {
                    return members.active;
                  })
                  .map((member, index) => {
                    return <p key={index}>{member.name}</p>;
                  })}
            </div>
            {/*genre div*/}
            <div className="discogs-details-genre-container">
              <h3>Genres:</h3>
              {this.props.spotifyDetails.genres.map((genre, index) => {
                return (
                  <p className="discogs-details-genre" key={index}>
                    {genre}
                  </p>
                );
              })}
            </div>
            {/*div for external links*/}
            <div className="discogs-details-link-container">
              <h3>External links:</h3>
              {/*div for filtering through related urls*/}
              {this.state.discogsDetails.urls.map((url, index) => {
                let site = {
                  name: "",
                  url: "",
                };
                if (url.includes("soundcloud")) {
                  site.name = "Soundcloud";
                  site.url = url;
                } else if (url.includes("youtube")) {
                  site.name = "YouTube";
                  site.url = url;
                } else if (url.includes("facebook")) {
                  site.name = "Facebook";
                  site.url = url;
                } else if (url.includes("twitter")) {
                  site.name = "Twitter";
                  site.url = url;
                } else if (url.includes("instagram")) {
                  site.name = "Instagram";
                  site.url = url;
                } else if (url.includes("wikipedia")) {
                  site.name = "Wikipedia";
                  site.url = url;
                }
                return (
                  <a
                    key={index}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>{site.name}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="no-results">!</p>
          <p className="no-results-text">No additonal information available.</p>
        </div>
      )
    ) : (
      <div className="loader"></div>
    );
    return <div className="discogs-details">{discogsDetails}</div>;
  }
}
