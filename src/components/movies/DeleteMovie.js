import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteMovie } from "../../actions/movieActions";
import { closeDialog } from "redux-dialog";
import { DELETE_DIALOG_NAME } from "./MovieList";

class DeleteMovie extends Component {
  onDelete = () => {
    const { deleteMovie, closeDialog, id } = this.props;
    deleteMovie(id);
    closeDialog(DELETE_DIALOG_NAME);
  };

  render() {
    const { closeDialog } = this.props;
    return (
      <div className="card">
        <div className="card-header">Confirm Delete</div>
        <div className="card-body">
          <button className="movie-btn edit-delete" onClick={this.onDelete}>
            Ok
          </button>
          <button
            className="movie-btn edit-delete"
            onClick={closeDialog.bind(this, DELETE_DIALOG_NAME)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.movie.currentMovieId
});

export default connect(
  mapStateToProps,
  { deleteMovie, closeDialog }
)(DeleteMovie);
