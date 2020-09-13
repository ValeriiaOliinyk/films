import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filmsOperations from '../redux/films/films-operations';
import PropTypes from 'prop-types';

// Components
import Container from '../components/Container';
import Title from '../components/Title';
import Search from '../components/Search';
import FilmsEditor from '../components/FilmsEditor';
import Modal from '../components/Modal';
import FilmsList from '../components/FilmsList';
import MainLoader from '../components/MainLoader';
import Error from '../components/Error';
import filmsSelectors from '../redux/films/films-selectors';

const HomeView = () => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(filmsSelectors.getLoading);
  const errorMessage = useSelector(filmsSelectors.getError);

  useEffect(() => {
    dispatch(filmsOperations.fetchFilms());
  }, [dispatch]);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const onShowInfo = id => {
    setId(id);
  };

  const onCloseInfo = () => {
    setId('');
  };

  return (
    <Container>
      {showModal && (
        <Modal onClose={toggleModal}>
          <FilmsEditor onCloseModal={toggleModal} />
        </Modal>
      )}
      <Search />
      {isLoading && <MainLoader />}
      <Title />
      {errorMessage && <Error />}
      <FilmsList
        onShow={onShowInfo}
        onCloseInformation={onCloseInfo}
        filmId={id}
        toggleModal={toggleModal}
      />
    </Container>
  );
};

HomeView.defaultProps = {
  fetchFilms: () => null,
  showModal: null,
  id: null,
};

HomeView.propTypes = {
  showModal: PropTypes.bool,
  id: PropTypes.string,
  fetchFilms: PropTypes.func,
};

export default HomeView;
