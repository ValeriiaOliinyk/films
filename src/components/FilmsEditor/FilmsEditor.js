import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FilmsEditor.scss';
import filmsOperations from '../../redux/films/films-operations';

class FilmsEditor extends Component {
  state = {
    Title: '',
    Relese: '',
    Format: '',
    Stars: '',
  };

  reset = () => {
    this.setState({ Title: '', Relese: '', Format: '', Stars: '' });
  };

  updateFilms = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { Title, Relese, Format, Stars } = this.state;
    e.preventDefault();
    this.props.onSubmit(Title, Relese, Format, Stars);
    this.props.onCloseModal();
    this.reset();
  };

  render() {
    const { Title, Relese, Format, Stars } = this.state;
    return (
      <>
        <h2 className="FilmEditor__title">Add film</h2>
        <form className="FilmEditor" onSubmit={this.handleSubmit}>
          <input
            name="Title"
            value={Title}
            placeholder="Title"
            onChange={this.updateFilms}
            required
            className="Film__input"
          />
          <input
            name="Relese"
            value={Relese}
            placeholder="Release Year"
            onChange={this.updateFilms}
            required
            className="Film__input"
          />
          <input
            name="Format"
            value={Format}
            placeholder="Format"
            onChange={this.updateFilms}
            required
            className="Film__input"
          />
          <input
            name="Stars"
            value={Stars}
            placeholder="Stars"
            onChange={this.updateFilms}
            required
            className="Film__input"
          />
          <button type="submit" className="FilmsEditor__button">
            Save
          </button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (title, relese, format, stars) =>
    dispatch(filmsOperations.addFilm(title, relese, format, stars)),
});

export default connect(null, mapDispatchToProps)(FilmsEditor);
