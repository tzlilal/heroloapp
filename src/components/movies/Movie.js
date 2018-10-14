import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovie, setMovieId } from "../../actions/movieActions";
import { openDialog } from "redux-dialog";
import { FORM_DIALOG_NAME, DELETE_DIALOG_NAME } from "./MovieList";

class Movie extends Component {
  onMovieClick = (id, dialogName) => {
    const { getMovie, openDialog, setMovieId } = this.props;
    if (dialogName === FORM_DIALOG_NAME) {
      getMovie(id);
    } else {
      setMovieId(id);
    }
    openDialog(dialogName);
  };

  render() {
    const { id, Title, Year, Runtime, Genre, Director } = this.props.movie;
    const actionButton = (label, diaglogName) => (
      <button
        type="button"
        className="movie-btn edit-delete"
        onClick={this.onMovieClick.bind(this, id, diaglogName)}
      >
        {label}
      </button>
    );
    return (
      <div className="movie-card">
        <div className="movie-title">{Title}</div>
        <div className="movie-detail">
          <p>Year: {Year}</p>
          <p>Runtime: {Runtime}</p>
          <p>Genre: {Genre}</p>
          <p>Director: {Director}</p>
        </div>
        <div className="btns-container">
          {actionButton("Delete", DELETE_DIALOG_NAME)}
          {actionButton("Edit", FORM_DIALOG_NAME)}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getMovie, openDialog, setMovieId }
)(Movie);
