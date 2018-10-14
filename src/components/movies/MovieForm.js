import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMovie, addMovie } from "../../actions/movieActions";
import { closeDialog } from "redux-dialog";
import { FORM_DIALOG_NAME } from "./MovieList";
import uuid from "uuid";
import _ from "lodash";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import TextInputGroup from "../layout/TextInputGroup";
import { filterTitle } from "../../helpers/filterTitle";

class MovieForm extends Component {
  state = {
    Title: "",
    Date: moment(),
    Runtime: "",
    Genre: "",
    Director: "",
    errors: {},
    calendarFocused: false
  };

  componentWillReceiveProps(nextProps, nextState) {
    if (!_.isEmpty(nextProps.movie)) {
      const { Title, Runtime, Genre, Director } = nextProps.movie;
      const Date = moment(nextProps.movie.Date);
      this.setState({
        Title,
        Date,
        Runtime,
        Genre,
        Director
      });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { Title, Date, Runtime, Genre, Director } = this.state;
    const { movie, movies, addMovie, updateMovie, closeDialog } = this.props;

    const isStringEmpty = str => !str.trim().length;
    const isTitleExist = Title =>
      movies.some(movie => movie.Title === filterTitle(Title));
    const err = "can't be empty";

    if (isStringEmpty(Title)) {
      this.setState({ errors: { Title: `Title ${err}` } });
      return;
    }
    if (isTitleExist(Title) && Title !== movie.Title) {
      this.setState({
        errors: { Title: "The same movie name is already exist" }
      });
      return;
    }
    if (isStringEmpty(Runtime)) {
      this.setState({ errors: { Runtime: `Runtime ${err}` } });
      return;
    }
    if (isStringEmpty(Genre)) {
      this.setState({ errors: { Genre: `Genre ${err}` } });
      return;
    }
    if (isStringEmpty(Director)) {
      this.setState({ errors: { Director: `Director ${err}` } });
      return;
    }

    const Year = Date.year();
    const newMovie = {
      Title: filterTitle(Title),
      Year,
      Date,
      Runtime,
      Genre,
      Director
    };

    if (_.isEmpty(movie)) {
      const id = uuid();
      newMovie.id = id;

      addMovie(newMovie);
    } else {
      const { id } = movie;
      newMovie.id = id;

      updateMovie(newMovie);
    }

    this.setState({
      Title: "",
      Date: moment(),
      Runtime: "",
      Genre: "",
      Director: "",
      errors: {},
      calendarFocused: false
    });
    closeDialog(FORM_DIALOG_NAME);
  };

  render() {
    const {
      Title,
      Date,
      Runtime,
      Genre,
      Director,
      errors,
      calendarFocused
    } = this.state;
    const { closeDialog, movie } = this.props;
    const headerType = _.isEmpty(movie) ? "Add" : "Edit";
    return (
      <div className="card mb-3">
        <div className="card-header">{headerType} Movie</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Title"
              name="Title"
              value={Title}
              onChange={this.onChange}
              error={errors.Title}
            />
            <TextInputGroup
              label="Runtime"
              name="Runtime"
              type="Runtime"
              value={Runtime}
              onChange={this.onChange}
              error={errors.Runtime}
            />
            <TextInputGroup
              label="Genre"
              name="Genre"
              value={Genre}
              onChange={this.onChange}
              error={errors.Genre}
            />
            <TextInputGroup
              label="Director"
              name="Director"
              value={Director}
              onChange={this.onChange}
              error={errors.Director}
            />
            <div className="form-group">
              <label htmlFor="Date">Date</label>
              <div>
                <SingleDatePicker
                  date={Date}
                  onDateChange={date => this.setState({ Date: date })}
                  focused={calendarFocused}
                  onFocusChange={({ focused }) =>
                    this.setState({ calendarFocused: focused })
                  }
                  numberOfMonths={1}
                  isOutsideRange={() => false}
                  required={true}
                  openDirection="up"
                />
              </div>
            </div>
            <button type="submit" className="movie-btn edit-delete">
              Save
            </button>
            <button
              type="button"
              onClick={closeDialog.bind(this, FORM_DIALOG_NAME)}
              className="movie-btn edit-delete"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie.movie,
  movies: state.movie.movies
});

export default connect(
  mapStateToProps,
  { updateMovie, addMovie, closeDialog }
)(MovieForm);
