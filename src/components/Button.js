import classes from '../styles/Button.module.css';

export default function Button({className, children, style, type}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={`${classes.btn} ${className}`} style={style}>
      {children}
    </button>
  );
}
