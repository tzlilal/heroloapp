import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies, clearMovie } from "../../actions/movieActions";
import reduxDialog, { openDialog } from "redux-dialog";
import Movie from "./Movie";
import MovieForm from "./MovieForm";
import DeleteMovie from "./DeleteMovie";

export const FORM_DIALOG_NAME = "Movie Form";
export const DELETE_DIALOG_NAME = "Confirm Delete";

class MovieList extends Component {
  componentDidMount() {
    this.props.getMovies();
  }
  onAddClick = dialogName => {
    const { clearMovie, openDialog } = this.props;
    clearMovie();
    openDialog(dialogName);
  };

  render() {
    const MovieDialog = reduxDialog({
      name: FORM_DIALOG_NAME
    })(MovieForm);

    const DeleteDialog = reduxDialog({
      name: DELETE_DIALOG_NAME
    })(DeleteMovie);

    const { movies } = this.props;
    return (
      <React.Fragment>
        <div className="btn-container">
          <button
            type="button"
            className="movie-btn add"
            onClick={this.onAddClick.bind(this, FORM_DIALOG_NAME)}
          >
            Add New Movie
          </button>
        </div>
        <div className="movie-list">
          {movies.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
        <MovieDialog className="modal-base container" />
        <DeleteDialog className="modal-base container" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movie.movies
});

export default connect(
  mapStateToProps,
  { getMovies, openDialog, clearMovie }
)(MovieList);
