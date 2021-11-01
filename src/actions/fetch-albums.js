import { addAlbums } from '../store/store.js';

export const fetchAlbums = () => {
  return (dispatch) => {
    const urlAlbums = `https://jsonplaceholder.typicode.com/users/1/albums`;
    try {
      const response = fetch(urlAlbums);

      response
        .then((res) => {
          return res.json();
        })
        .then((data) => dispatch(addAlbums(data)));
    } catch (error) {
      throw new Error('Something went wrong...');
    }
  };
};
