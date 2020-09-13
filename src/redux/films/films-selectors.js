import { createSelector } from 'reselect';

const getLoading = state => state.films.loading;
const getFilms = state => state.films.films;
const getFilter = state => state.films.filter;
const getError = state => state.films.error;

const getFiltredFilms = createSelector(
  [getFilms, getFilter],
  (films, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return films.filter(
      film =>
        film.Title.toLowerCase().includes(normalizedFilter) ||
        film.Stars.toLowerCase().includes(normalizedFilter),
    );
  },
);

export default { getLoading, getFilms, getFilter, getError, getFiltredFilms };
