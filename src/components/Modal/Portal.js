import React from 'react';
import ReactDOM from 'react-dom';
import ModalAlbum from './modal-album.js';

const Portal = () => {
  return ReactDOM.createPortal(<ModalAlbum />, document.body);
};

export default Portal;
