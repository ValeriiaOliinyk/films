import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  fetchFilmRequest,
  fetchFilmSuccess,
  fetchFilmError,
  addFilmRequest,
  addFilmSuccess,
  addFilmError,
  deleteFilmRequest,
  deleteFilmSuccess,
  deleteFilmError,
  changeFilter,
} from './films-actions';

const films = createReducer([], {
  [fetchFilmSuccess]: (_, { payload }) => payload,
  [addFilmSuccess]: (state, { payload }) => [...state, payload],
  [deleteFilmSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [addFilmRequest]: () => true,
  [addFilmSuccess]: () => false,
  [addFilmError]: () => false,
  [fetchFilmRequest]: () => true,
  [fetchFilmError]: () => false,
  [fetchFilmSuccess]: () => false,
  [deleteFilmRequest]: () => true,
  [deleteFilmError]: () => false,
  [deleteFilmSuccess]: () => false,
});

const error = createReducer(false, {
  [addFilmRequest]: () => false,
  [addFilmSuccess]: () => false,
  [addFilmError]: () => true,
  [fetchFilmRequest]: () => false,
  [fetchFilmError]: () => true,
  [fetchFilmSuccess]: () => false,
  [deleteFilmRequest]: () => false,
  [deleteFilmError]: () => true,
  [deleteFilmSuccess]: () => false,
});

export default combineReducers({
  films,
  filter,
  loading,
  error,
});
