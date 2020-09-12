import axios from 'axios';
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
} from './films-actions';

axios.defaults.baseURL = 'http://localhost:4040';

const fetchFilms = () => dispatch => {
  dispatch(fetchFilmRequest());
  axios
    .get('/films')
    .then(({ data }) => dispatch(fetchFilmSuccess(data)))
    .catch(err => dispatch(fetchFilmError(err.message)));
};

const addFilm = (Title, Relese, Format, Stars) => dispatch => {
  const newFilm = { Title, Relese, Format, Stars };
  dispatch(addFilmRequest());
  axios
    .post('/films', newFilm)
    .then(({ data }) => dispatch(addFilmSuccess(data)))
    .catch(error => dispatch(addFilmError(error.message)));
};

const deleteFilm = filmId => dispatch => {
  dispatch(deleteFilmRequest());
  axios
    .delete(`/films/${filmId}`)
    .then(() => dispatch(deleteFilmSuccess(filmId)))
    .catch(error => dispatch(deleteFilmError(error.message)));
};

export default {
  fetchFilms,
  addFilm,
  deleteFilm,
};
