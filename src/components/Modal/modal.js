import React from 'react';
import { useSelector } from 'react-redux';
import Photo from './photo.js';
import Album from './album.js';

const Modal = () => {
  const isModalVisible = useSelector(({ modal }) => modal);

  const photos = useSelector(({ photos }) => photos);

  if (!isModalVisible) {
    return null;
  }

  if (!photos.length) {
    return <Album />;
  }

  if (photos.length > 0) {
    return <Photo />;
  }
};

export default Modal;
