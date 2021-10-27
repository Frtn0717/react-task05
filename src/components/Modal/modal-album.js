import React, { useCallback } from 'react';
// import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './modal-styles.module.scss';
import { closeModal, addAlbums } from '../../store/store';

const ModalAlbum = () => {
  const dispatch = useDispatch();

  const isModalVisible = useSelector(({ modal }) => modal);
  const currentUser = useSelector(({ user }) => user[0]);
  const userAlbumsNumber = useSelector(({ albums }) => albums);

  const cancel = () => {
    dispatch(closeModal(false));
    console.log('Cancel has been clicked');
    console.log(isModalVisible);
  };

  const accept = () => {
    const title = document.getElementById('new-album-title').value.trim();
    const errorMessage = document.getElementById('error');
    if (!title.length) {
      errorMessage.style.display = 'block';
    } else {
      dispatch(closeModal(false));
    }
  };

  let currentAlbumsNumber = userAlbumsNumber.length + 1;

  function makeKey() {
    return () => {
      return currentAlbumsNumber++;
    };
  }

  const currentAlbumId = makeKey();

  const addItemToAlbum = useCallback(() => {
    const newAlbumTitle = document.getElementById('new-album-title').value;

    dispatch(
      addAlbums([
        { userId: currentUser.id, id: currentAlbumId(), title: newAlbumTitle },
      ])
    );
  }, [dispatch, currentUser, currentAlbumId]);

  if (!isModalVisible) {
    return null;
  } else {
    return (
      <div className={style.modalOverlay}>
        <div className={style.modalWrap}>
          <div className={style.modalHead}>
            <h5>Add info about new </h5>

            <button className={style.modalCloseBtn} onClick={cancel}></button>
          </div>

          <div className={style.modalContent}>
            <p>
              <span>Title: </span>
              <input type="text" id="new-album-title"></input>
              <span className={style.modalContentError} id="error">
                Title cannot be an empty
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
                accept();
                addItemToAlbum();
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

export default ModalAlbum;
