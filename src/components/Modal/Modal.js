import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import propTypes from 'prop-types';
import { Overlay, ModalBody } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, link }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    disableBodyScroll(modalRoot);

    return () => {
      window.removeEventListener('keydown', closeModal);
      enableBodyScroll(modalRoot);
    };
  });

  const closeModal = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={closeModal}>
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
