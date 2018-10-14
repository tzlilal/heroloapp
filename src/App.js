import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import MovieList from "./components/movies/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h2 className="app-header">Cinema</h2>
          <MovieList />
        </div>
      </Provider>
    );
  }
}

export default App;
