import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './FilmsEditor.scss';
import filmsOperations from '../../redux/films/films-operations';
import PropTypes from 'prop-types';

const FilmsEditor = ({ onCloseModal }) => {
  const [Title, setTitle] = useState('');
  const [Relese, setRelese] = useState('');
  const [Format, setFormat] = useState('');
  const [Stars, setStars] = useState('');
  const dispatch = useDispatch();
  const onSubmit = (title, relese, format, stars) =>
    dispatch(filmsOperations.addFilm(title, relese, format, stars));

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'Title':
        setTitle(value);
        break;
      case 'Relese':
        setRelese(value);
        break;
      case 'Format':
        setFormat(value);
        break;
      case 'Stars':
        setStars(value);
        break;
      default:
        return null;
    }
  };

  const reset = () => {
    setTitle('');
    setRelese('');
    setFormat('');
    setStars('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(Title, Relese, Format, Stars);
    onCloseModal();
    reset();
  };

  return (
    <>
      <h2 className="FilmEditor__title">Add film</h2>
      <form className="FilmEditor" onSubmit={handleSubmit}>
        <input
          name="Title"
          value={Title}
          placeholder="Title"
          onChange={handleChange}
          required
          className="Film__input"
        />
        <input
          name="Relese"
          value={Relese}
          placeholder="Release Year"
          onChange={handleChange}
          required
          className="Film__input"
        />
        <input
          name="Format"
          value={Format}
          placeholder="Format"
          onChange={handleChange}
          required
          className="Film__input"
        />
        <input
          name="Stars"
          value={Stars}
          placeholder="Stars"
          onChange={handleChange}
          required
          className="Film__input"
        />
        <button type="submit" className="FilmsEditor__button">
          Save
        </button>
      </form>
    </>
  );
};

FilmsEditor.defaultProps = {
  Title: '',
  Relese: '',
  Format: '',
  Stars: '',
  onSubmit: () => null,
};

FilmsEditor.propTypes = {
  Title: PropTypes.string,
  Relese: PropTypes.string,
  Format: PropTypes.string,
  Stars: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default FilmsEditor;
