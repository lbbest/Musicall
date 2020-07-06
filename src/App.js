import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Artist from "./screens/Artist";
import Album from "./screens/Album";
import Track from "./screens/Track";

// App component start
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/artist" component={Artist} />
            <Route path="/album" component={Album} />
            <Route path="/track" component={Track} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
