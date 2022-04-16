import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import propTypes from 'prop-types';
import { Overlay, ModalBody } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, link }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscPress);
    disableBodyScroll(modalRoot);

    return () => {
      window.removeEventListener('keydown', onEscPress);
      enableBodyScroll(modalRoot);
    };
  });
  const onEscPress = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalBody>
        <img src={link} alt="img" />
      </ModalBody>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  link: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
};

export default Modal;
