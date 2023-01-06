import React from 'react';
import classes from '../styles/Form.module.css';

export default function Form({children, ...rest}) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <form action="#" className= {classes.form} {...rest}>
      {children}
    </form>
  );
}
