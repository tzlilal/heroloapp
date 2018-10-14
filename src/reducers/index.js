import { combineReducers } from "redux";
import { dialogReducer } from "redux-dialog";
import movieReducer from "./movieReducer";

export default combineReducers({
  movie: movieReducer,
  dialogReducer
});
