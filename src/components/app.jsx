import UserDetails from './UserDetails/UserDetails';
import Content from './Content/Content';
import style from './app-style.module.scss';
import React from 'react';

const App = () => {
  return (
    <section className={style.mainContent}>
      <UserDetails />
      <Content />
    </section>
  );
};

export default App;
