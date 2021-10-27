import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './modal-styles.module.scss';
import { closeModal, addAlbums } from '../../store/store';

const Album = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(({ user }) => user[0]);
  const userAlbumsNumber = useSelector(({ albums }) => albums);
  const photos = useSelector(({ photos }) => photos);

  const isNewAlbumTitleEmpty = () => {
    const title = document.getElementById('new-album-title').value.trim();
    return title.length === 0;
  };

  const cancel = () => {
    dispatch(closeModal(false));
  };

  const acceptAlbum = () => {
    const errorMessage = document.getElementById('error');
    if (isNewAlbumTitleEmpty()) {
      errorMessage.style.display = 'block';
    } else {
      dispatch(closeModal(false));
    }
  };

  let currentAlbumsNumber = userAlbumsNumber.length + 1;

  function makeNewAlbumId() {
    return () => {
      return currentAlbumsNumber++;
    };
  }

  const newAlbumId = makeNewAlbumId();

  const addItemToAlbum = useCallback(() => {
    const newAlbumTitle = document.getElementById('new-album-title').value;

    dispatch(
      addAlbums([
        { userId: currentUser.id, id: newAlbumId(), title: newAlbumTitle },
      ])
    );
  }, [dispatch, currentUser, newAlbumId]);

  if (!photos.length) {
    return (
      <div className={style.modalOverlay}>
        <div className={style.modalWrap}>
          <div className={style.modalHead}>
            <h5>Add info about new album</h5>

            <button className={style.modalCloseBtn} onClick={cancel}></button>
          </div>

          <div className={style.modalContent}>
            <p>
              <span>Title: </span>
              <input type="text" id="new-album-title"></input>
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
                acceptAlbum();
                if (!isNewAlbumTitleEmpty()) {
                  addItemToAlbum();
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
  }
};

export default Album;
