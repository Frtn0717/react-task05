import style from './photos-style.module.scss';
import React, { useEffect, useCallback } from 'react';
import { fetchPhotos } from '../../actions/fetch-photos';
import { useDispatch, useSelector } from 'react-redux';
import { addActiveAlbum, addPhotos } from '../../store/store.js';

const Photos = () => {
  const dispatch = useDispatch();

  const activeAlbum = useSelector(({ activeAlbum }) => activeAlbum);
  const photos = useSelector(({ photos }) => photos);

  useEffect(() => {
    if (photos.length === 0) {
      dispatch(fetchPhotos(activeAlbum.id));
    }
  }, [dispatch, activeAlbum.id, photos]);

  const backToAlbums = useCallback(() => {
    dispatch(addActiveAlbum(null));
  }, [dispatch]);

  const addItemToPhoto = () => {
    dispatch(
      addPhotos([
        {
          // hardcoded photo
          albumId: 29,
          id: 777,
          title: 'Waterfall-Photo',
          url: 'https://via.placeholder.com/600/c3eecd',
          thumbnailUrl: 'https://via.placeholder.com/150/c3eecd',
        },
      ])
    );
  };

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
      <button className={style.backBtn} onClick={addItemToPhoto}>
        Add photo
      </button>
    </section>
  );
};

export default Photos;
