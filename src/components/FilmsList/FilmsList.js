import React, { Component } from 'react';
import './FilmsList.scss';
import { connect } from 'react-redux';
import filmsOperations from '../../redux/films/films-operations';

// Components
import Info from '../../components/Info';
import IconButton from '../../components/IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/trash.svg';
import { ReactComponent as Infocon } from '../../icons/information.svg';
import { ReactComponent as AddIcon } from '../../icons/plus.svg';
import { ReactComponent as SortIcon } from '../../icons/sort.svg';

class FilmsList extends Component {
  state = { sortByName: false };

  getSortedFilmsByName = arr => {
    arr.sort((a, b) => {
      let nameA = a.Title.toLowerCase();
      let nameB = b.Title.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  };

  getSortedBack = arr => {
    arr.sort((a, b) => {
      let nameA = a.Title.toLowerCase();
      let nameB = b.Title.toLowerCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    });
  };

  sortByName = () => {
    this.setState(({ sortByName }) => ({
      sortByName: !sortByName,
    }));
  };

  render() {
    const {
      films,
      onDelete,
      onShow,
      filmId,
      onCloseInformation,
      toggleModal,
    } = this.props;

    const { sortByName } = this.state;

    if (sortByName) {
      this.getSortedFilmsByName(films);
    }

    if (!sortByName) {
      this.getSortedBack(films);
    }

    return (
      <>
        <div className="Home__buttons">
          <IconButton onClick={toggleModal}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={this.sortByName}>
            <SortIcon />
          </IconButton>
        </div>
        <ul>
          {films.length > 0 &&
            films.map(film => (
              <li key={film.id}>
                <h2>{film.Title}</h2>
                {film.id === filmId && (
                  <Info onClose={onCloseInformation}>
                    <h3>Title: {film.Title}</h3>
                    <p>Release Year: {film['Release Year'] || film.Relese}</p>
                    <p>Format: {film.Format}</p>
                    <p>Stars: {film.Stars}</p>
                    <p>Id: {film.id}</p>
                    <button onClick={onCloseInformation}>Close</button>
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
            ))}
        </ul>
      </>
    );
  }
}

const getFiltredFilms = (allFilms, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allFilms.filter(
    film =>
      film.Title.toLowerCase().includes(normalizedFilter) ||
      film.Stars.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = state => {
  const { films, filter } = state.films;
  const filtredFilms = getFiltredFilms(films, filter);

  return {
    films: filtredFilms,
  };
};

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(filmsOperations.deleteFilm(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmsList);
