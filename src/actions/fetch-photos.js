import { addPhotos } from '../store/store.js';

export const fetchPhotos = (albumId) => {
  return (dispatch) => {
    const urlPhotos = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`;
    try {
      const response = fetch(urlPhotos);

      response
        .then((res) => {
          return res.json();
        })
        .then((data) => dispatch(addPhotos(data)));
    } catch (error) {
      throw new Error('Something went wrong...');
    }
  };
};
