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
        <div>
          {/*discogs profile div*/}
          <div>
            <p>Profile:</p>
            <p>{this.state.discogsDetails.profile}</p>
          </div>
          {/*div that renders either artist real name or band member names*/}
          <div>
            {this.state.discogsDetails.realname && (
              <p>Real name: {this.state.discogsDetails.realname}</p>
            )}
            {this.state.discogsDetails.members && <p>Active Members:</p>}
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
          <div>
            <p>Genres:</p>
            {this.props.spotifyDetails.genres.map((genre, index) => {
              return <p key={index}>{genre}</p>;
            })}
          </div>
          {/*div for external links*/}
          <div>
            <p>External links:</p>
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
      ) : (
        <div>
          <p className="no-results">!</p>
          <p className="no-results-text">No additonal information available.</p>
        </div>
      )
    ) : (
      <div className="loader"></div>
    );
    return <div>{discogsDetails}</div>;
  }
}
