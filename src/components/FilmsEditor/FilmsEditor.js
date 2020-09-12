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
    // if (Title || Relese ||Format || Stars === '') {
    //   alert(`Заполните все поля`);
    //   this.reset();
    //   return;
    // }
    this.props.onSubmit(Title, Relese, Format, Stars);
    this.props.onCloseModal();
    this.reset();
  };

  render() {
    const { Title, Relese, Format, Stars } = this.state;
    return (
      <form className="TodoEditor" onSubmit={this.handleSubmit}>
        <input
          name="Title"
          value={Title}
          placeholder="Title"
          onChange={this.updateFilms}
          required
        />
        <input
          name="Relese"
          value={Relese}
          placeholder="Release Year"
          onChange={this.updateFilms}
          required
        />
        <input
          name="Format"
          value={Format}
          placeholder="Format"
          onChange={this.updateFilms}
          required
        />
        <input
          name="Stars"
          value={Stars}
          placeholder="Stars"
          onChange={this.updateFilms}
          required
        />
        <button type="submit" className="TodoEditor__button">
          Сохранить
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (title, relese, format, stars) =>
    dispatch(filmsOperations.addFilm(title, relese, format, stars)),
});

export default connect(null, mapDispatchToProps)(FilmsEditor);
