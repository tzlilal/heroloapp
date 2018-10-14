import {
  GET_MOVIES,
  GET_MOVIE,
  DELETE_MOVIE,
  ADD_MOVIE,
  UPDATE_MOVIE,
  SET_MOVIE_ID,
  CLEAR_MOVIE
} from "./types";
import { filterTitle } from "../helpers/filterTitle";
import axios from "axios";

const ROOT_URL = "//www.omdbapi.com";
const API_KEY = "&apikey=1a7614bd";

export const getMovies = () => async dispatch => {
  const moviesUrl = `${ROOT_URL}/?s=star&type=movie${API_KEY}`;

  const res = await axios.get(moviesUrl);
  const promises = res.data.Search.map(async movie => {
    const url = `${ROOT_URL}/?i=${movie.imdbID}${API_KEY}`;
    return await axios.get(url);
  });

  const data = await Promise.all(promises);
  const movies = data.map(item => {
    const {
      imdbID,
      Title,
      Year,
      Released,
      Runtime,
      Genre,
      Director
    } = item.data;
    return {
      id: imdbID,
      Title: filterTitle(Title),
      Year,
      Date: Released,
      Runtime,
      Genre,
      Director
    };
  });
  dispatch({
    type: GET_MOVIES,
    payload: movies
  });
};

export const getMovie = id => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/?i=${id}${API_KEY}`);
  const { imdbID, Title, Year, Released, Runtime, Genre, Director } = res.data;
  const movie = {
    id: imdbID,
    Title,
    Year,
    Date: Released,
    Runtime,
    Genre,
    Director
  };
  dispatch({
    type: GET_MOVIE,
    payload: movie
  });
};

export const deleteMovie = id => {
  return {
    type: DELETE_MOVIE,
    payload: id
  };
};

export const addMovie = movie => {
  return {
    type: ADD_MOVIE,
    payload: movie
  };
};

export const updateMovie = movie => {
  return {
    type: UPDATE_MOVIE,
    payload: movie
  };
};

export const setMovieId = id => {
  return {
    type: SET_MOVIE_ID,
    payload: id
  };
};

export const clearMovie = () => {
  return {
    type: CLEAR_MOVIE
  };
};
