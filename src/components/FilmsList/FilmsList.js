import React, { useState } from 'react';
import './FilmsList.scss';
import { useSelector, useDispatch } from 'react-redux';
import filmsOperations from '../../redux/films/films-operations';
import filmsSelectors from '../../redux/films/films-selectors';
import PropTypes from 'prop-types';

// Components
import Info from '../../components/Info';
import IconButton from '../../components/IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/trash.svg';
import { ReactComponent as Infocon } from '../../icons/information.svg';
import { ReactComponent as AddIcon } from '../../icons/plus.svg';
import { ReactComponent as SortIcon } from '../../icons/sort.svg';
import NoResults from '../NoResults';

const FilmsList = ({ onShow, filmId, onCloseInformation, toggleModal }) => {
  const [sortByName, setSortByName] = useState(false);

  const dispatch = useDispatch();
  const onDelete = id => dispatch(filmsOperations.deleteFilm(id));
  const films = useSelector(filmsSelectors.getFiltredFilms);

  const getSortedFilmsByName = arr => {
    arr.sort((a, b) => {
      let nameA = a.Title.toLowerCase();
      let nameB = b.Title.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  };

  const getSortedBack = arr => {
    arr.sort((a, b) => {
      let nameA = a.Title.toLowerCase();
      let nameB = b.Title.toLowerCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    });
  };

  const onSortByName = () => {
    setSortByName(!sortByName);
  };

  if (sortByName) {
    getSortedFilmsByName(films);
  }

  if (!sortByName) {
    getSortedBack(films);
  }

  return (
    <>
      <div className="Films__buttons">
        <IconButton onClick={toggleModal}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={onSortByName}>
          <SortIcon />
        </IconButton>
      </div>
      <ul className="Films__list">
        {films.length > 0 ? (
          films.map(film => (
            <li key={film.id} className="Films__item">
              <h2>{film.Title}</h2>
              {film.id === filmId && (
                <Info onClose={onCloseInformation}>
                  <h3 className="Films__title">Title: {film.Title}</h3>
                  <p>
                    <span className="Films__release">Release Year: </span>
                    {film['Release Year'] || film.Relese}
                  </p>
                  <p>
                    <span className="Films__release">Format: </span>
                    {film.Format}
                  </p>
                  <p>
                    <span className="Films__release">Stars: </span>
                    {film.Stars}
                  </p>
                  <button onClick={onCloseInformation} className="Films__btn">
                    Close
                  </button>
                </Info>
              )}
              <div>
                <IconButton onClick={() => onDelete(film.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => onShow(film.id)}>
                  <Infocon />
                </IconButton>
              </div>
            </li>
          ))
        ) : (
          <NoResults />
        )}
      </ul>
    </>
  );
};

FilmsList.defaultProps = {
  onDelete: () => null,
  sortByName: null,
};

FilmsList.propTypes = {
  sortByName: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default FilmsList;
