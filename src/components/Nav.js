import React from 'react';
import classes from '../styles/Nav.module.css';
import Account from './Account';
import Brand from './Brand';

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <Brand />
      <Account />
    </nav>
  );
}
