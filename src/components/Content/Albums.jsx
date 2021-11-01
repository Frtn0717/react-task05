import style from './content-style.module.scss';
import React, { useEffect, useRef } from 'react';
import { fetchAlbums } from '../../actions/fetch-albums';
import { useDispatch, useSelector } from 'react-redux';
import { addActiveAlbum, openModal } from '../../store/store.js';

const Albums = () => {
  const dispatch = useDispatch();
  const albums = useSelector(({ albums }) => albums);

  const goToRef = (ref) => {
    window.scrollTo({ top: 2000, behavior: 'smooth' });
  };

  const refToEnd = useRef(null);
  const executeScroll = () => goToRef(refToEnd);

  useEffect(() => {
    if (albums.length === 0) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, albums]);

  let key = 1;

  function makeKey() {
    return () => {
      return key++;
    };
  }

  const currentKey = makeKey();

  return (
    <section className={style.contentWrap}>
      <h3> Albums </h3>

      <button className={style.toEndBtn} onClick={executeScroll}>
        To end
      </button>

      <div className={style.albums}>
        {albums.map((album) => {
          return (
            <div
              key={currentKey()}
              className={style.albumItem}
              onClick={() => dispatch(addActiveAlbum(album))}
            >
              {album.title}
            </div>
          );
        })}
      </div>
      <button
        className={style.backBtn}
        onClick={() => {
          dispatch(openModal(true));
        }}
      >
        Add album
      </button>
    </section>
  );
};

export default Albums;
