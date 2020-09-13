import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Info.scss';

const modalRoot = document.querySelector('#modal-info-root');

export default function Info({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Info__backdrop" onClick={handleBackdropClick}>
      <div className="Info__content">{children}</div>
    </div>,
    modalRoot,
  );
}

Info.propTypes = {
  children: PropTypes.node.isRequired,
};
