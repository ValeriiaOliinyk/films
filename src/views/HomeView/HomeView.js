import React, { Component } from 'react';
import { connect } from 'react-redux';
import filmsOperations from '../../redux/films/films-operations';

// Components
import Container from '../../components/Container';
import Title from '../../components/Title';
import Search from '../../components/Search';
import FilmsEditor from '../../components/FilmsEditor';
import Modal from '../../components/Modal';
import FilmsList from '../../components/FilmsList';

import './HomeView.scss';

class HomeView extends Component {
  state = {
    showModal: false,
    sortFilms: false,
    id: '',
    information: '',
  };

  componentDidMount() {
    this.props.fetchFilms();
  }

  componentWillUnmount() {
    this.setState({ sortFilms: false });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onShowInfo = id => {
    this.setState({ id });
  };

  onCloseInfo = () => {
    this.setState({ id: '' });
  };

  render() {
    const { showModal, id } = this.state;

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <FilmsEditor onCloseModal={this.toggleModal} />
          </Modal>
        )}
        <Search />
        <Title />
        <FilmsList
          onShow={this.onShowInfo}
          onCloseInformation={this.onCloseInfo}
          filmId={id}
          toggleModal={this.toggleModal}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  films: state.films.films,
  filter: state.films.filter,
});

const mapDispatchToProps = dispathc => ({
  fetchFilms: () => dispathc(filmsOperations.fetchFilms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
