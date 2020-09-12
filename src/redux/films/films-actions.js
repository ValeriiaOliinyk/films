import { createAction } from '@reduxjs/toolkit';

export const fetchFilmRequest = createAction('films/fetchFilmRequest');
export const fetchFilmSuccess = createAction('films/fetchFilmSuccess');
export const fetchFilmError = createAction('films/fetchFilmError');

export const addFilmRequest = createAction('films/addFilmRequest');
export const addFilmSuccess = createAction('films/addFilmSuccess');
export const addFilmError = createAction('films/addFilmError');

export const deleteFilmRequest = createAction('films/deleteFilmRequest');
export const deleteFilmSuccess = createAction('films/deleteFilmSuccess');
export const deleteFilmError = createAction('films/deleteFilmError');

export const changeFilter = createAction('films/change');
