import React from 'react';
import { changeFilter } from '../../redux/films/films-actions';
import PropTypes from 'prop-types';
import filmsSelectors from '../../redux/films/films-selectors';
import { useDispatch, useSelector } from 'react-redux';
import './Search.scss';

const Search = () => {
  const value = useSelector(filmsSelectors.getFilter);
  const dispatch = useDispatch();
  const onChange = e => dispatch(changeFilter(e.currentTarget.value));
  return (
    <header className="Searchbar">
      <form className="SearchForm">
        <input
          className="SearchForm-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search films"
        />
      </form>
    </header>
  );
};

Search.defaultProps = {
  onChange: () => null,
  value: null,
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Search;
