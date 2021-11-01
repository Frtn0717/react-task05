import { addUser } from '../store/store.js';

export const fetchUser = () => {
  return (dispatch) => {
    const urlUser = `https://jsonplaceholder.typicode.com/users/1`;
    try {
      const response = fetch(urlUser);

      response
        .then((res) => {
          return res.json();
        })
        .then((data) => dispatch(addUser(data)));
    } catch (error) {
      throw new Error('Something went wrong...');
    }
  };
};
