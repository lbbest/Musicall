import React, { Component } from "react";
import axios from "axios";

export default class Concerts extends Component {
  state = {
    artist: this.props.artist,
    concerts: null,
    isLoading: false,
    noResults: false,
  };
  componentDidMount() {
    let keyword = this.state.artist;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://app.ticketmaster.eu/discovery/v2/events.json?keyword=${keyword}&classificationName=music&category_ids=10001&apikey=lJQWvmlZSPXROglcCC9HnzJGG8wczkiy`;

    axios
      .get(proxyurl + url)
      .then((res) => {
        console.log(res);
        let concerts = [];
        concerts = res.data._embedded.events.filter((concert) => {
          return concert.name === this.state.artist;
        });
        this.setState({ concerts: concerts });
        console.log(this.state.concerts);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const concerts = this.state.concerts ? (
      <table className="concerts-table" cellSpacing="0" cellPadding="5px">
        {this.state.concerts.map((concert, index) => {
          const date = concert.dates.start.localDate;
          const newDate = date.split("-").reverse().join(".");
          return (
            <tr key={index}>
              <td className="concert-details">
                {this.state.artist} @ {concert._embedded.venues[0].name},{" "}
                {concert._embedded.venues[0].city.name} -{" "}
                {concert._embedded.venues[0].country.countryCode}
              </td>
              <td className="concert-date">{newDate}</td>
            </tr>
          );
        })}
      </table>
    ) : (
      <div className="loader"></div>
    );
    return (
      <div className="artist-section-container artist-section-top-row artist-section-right">
        <h3 id="upcoming-concerts">Upcoming Concerts:</h3>
        <div className="concerts-table-container">{concerts}</div>
      </div>
    );
  }
}
