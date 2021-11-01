import style from './content-style.module.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import Photos from './Photos';
import Albums from './Albums';

const Content = () => {
  const activeAlbum = useSelector(({ activeAlbum }) => activeAlbum);

  if (activeAlbum === null) {
    return <Albums />;
  } else {
    return (
      <section className={style.contentWrap}>
        <Photos />
      </section>
    );
  }
};

export default Content;
