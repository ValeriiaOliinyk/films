import React from 'react';
import { connect } from 'react-redux';
import { changeFilter } from '../../redux/films/films-actions';
import PropTypes from 'prop-types';
import './Search.scss';

const Search = ({ onChange, value }) => {
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

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: state.films.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeFilter(e.currentTarget.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
