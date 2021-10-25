import style from './user-info-styles.module.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../actions/fetch-user.js';

const UserInfo = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ user }) => user);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUser());
    }
  }, [dispatch, users]);

  return (
    <section className={style.info}>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h3> {user.name} </h3>
            <p>
              {' '}
              <b>Email:</b> {user.email}{' '}
            </p>
            <p>
              {' '}
              <b>Phone:</b> {user.phone}{' '}
            </p>
            <p>
              <b>Address:</b> {user.address.street},{user.address.suite},
              {user.address.city},{user.address.zipcode}
            </p>
            <p>
              {' '}
              <b>Website:</b> {user.website}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default UserInfo;
