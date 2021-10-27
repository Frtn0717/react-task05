import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal.js';

const Portal = () => {
  return ReactDOM.createPortal(
    <>
      <Modal />
    </>,
    document.body
  );
};

export default Portal;
