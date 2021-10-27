import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './modal-styles.module.scss';
import { closeModal, addPhotos } from '../../store/store';

const Photo = () => {
  const dispatch = useDispatch();

  const photos = useSelector(({ photos }) => photos);
  const activeAlbum = useSelector(({ activeAlbum }) => activeAlbum);

  const cancel = () => {
    dispatch(closeModal(false));
  };

  const isNewPhotoTitleEmpty = () => {
    const title = document.getElementById('new-photo-title').value.trim();
    return title.length === 0;
  };

  const acceptPhoto = () => {
    const errorMessage = document.getElementById('error');
    if (isNewPhotoTitleEmpty()) {
      errorMessage.style.display = 'block';
    } else {
      dispatch(closeModal(false));
    }
  };

  let currentPhotosNumber = photos[photos?.length - 1]?.id + 1;

  function makeNewPhotoId() {
    return () => {
      return currentPhotosNumber++;
    };
  }

  const newPhotoId = makeNewPhotoId();

  const addItemToPhoto = useCallback(() => {
    const newPhotoTitle = document.getElementById('new-photo-title').value;

    dispatch(
      addPhotos([
        {
          albumId: activeAlbum.id,
          id: newPhotoId(),
          title: newPhotoTitle,
          url: 'https://via.placeholder.com/600/c3eecd',
          thumbnailUrl: 'https://via.placeholder.com/150/c3eecd',
        },
      ])
    );
  }, [dispatch, activeAlbum, newPhotoId]);

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalWrap}>
        <div className={style.modalHead}>
          <h5>Add info about new photo</h5>

          <button className={style.modalCloseBtn} onClick={cancel}></button>
        </div>

        <div className={style.modalContent}>
          <p>
            <span>Title: </span>
            <input type="text" id="new-photo-title"></input>
            <span className={style.modalContentError} id="error">
              Title cannot be empty
            </span>
          </p>
        </div>

        <div className={style.modalFoot}>
          <button type="submit" className={style.cancelBtn} onClick={cancel}>
            {' '}
            Cancel{' '}
          </button>
          <button
            type="submit"
            className={style.acceptBtn}
            onClick={() => {
              acceptPhoto();
              if (!isNewPhotoTitleEmpty()) {
                addItemToPhoto();
              }
            }}
          >
            {' '}
            Accept{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Photo;
