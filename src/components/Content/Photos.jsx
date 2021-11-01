import style from './photos-style.module.scss';
import React, { useEffect, useCallback, useRef } from 'react';
import { fetchPhotos } from '../../actions/fetch-photos';
import { useDispatch, useSelector } from 'react-redux';
import { addActiveAlbum, clearPhotos, openModal } from '../../store/store.js';

const Photos = () => {
  const dispatch = useDispatch();
  const activeAlbum = useSelector(({ activeAlbum }) => activeAlbum);
  const photos = useSelector(({ photos }) => photos);

  const goToRef = (ref) => {
    window.scrollTo({ top: 2000, behavior: 'smooth' });
  };

  const refToEnd = useRef(null);
  const executeScroll = () => goToRef(refToEnd);

  useEffect(() => {
    if (photos.length === 0) {
      dispatch(fetchPhotos(activeAlbum.id));
    }
  }, [dispatch, activeAlbum.id, photos]);

  const backToAlbums = useCallback(() => {
    dispatch(addActiveAlbum(null));
    dispatch(clearPhotos([]));
  }, [dispatch]);

  let Key = 1;

  function makeKey() {
    return () => {
      return Key++;
    };
  }

  const currentKey = makeKey();

  return (
    <section className={style.contentWrap}>
      <h3> {activeAlbum.title.toUpperCase()} </h3>

      <button className={style.toEndBtn} onClick={executeScroll}>
        To end
      </button>

      <div className={style.photos}>
        {photos.map((photo) => {
          return (
            <div key={currentKey()} className={style.photosItem}>
              <img src={photo.thumbnailUrl} alt={photo.title}></img>
              <span>{photo.id}</span>
            </div>
          );
        })}
      </div>
      <button className={style.backBtn} onClick={backToAlbums}>
        Back
      </button>
      <button
        className={style.backBtn}
        onClick={() => {
          dispatch(openModal(true));
        }}
      >
        Add photo
      </button>
    </section>
  );
};

export default Photos;
