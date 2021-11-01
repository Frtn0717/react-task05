import Avatar from './Avatar/Avatar';
import UserInfo from './UserInfo/UserInfo';
import style from './user-details-styles.module.scss';
import React from 'react';

const UserDetails = () => {
  return (
    <section className={style.details}>
      <Avatar />
      <UserInfo />
    </section>
  );
};

export default UserDetails;
