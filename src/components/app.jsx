import UserDetails from './UserDetails/UserDetails';
import Content from './Content/Content';
import style from './app-style.module.scss';
import React from 'react';
import Portal from './Modal/Portal.js';

const App = () => {
  return (
    <section className={style.mainContent}>
      <UserDetails />
      <Content />
      <Portal />
    </section>
  );
};

export default App;
