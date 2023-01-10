import classes from '../styles/Button.module.css';

export default function Button({className, children, style, type, ...rest}) {
  return (
    // eslint-disable-next-line react/button-has-type, react/jsx-props-no-spreading
    <button type={type} className={`${classes.btn} ${className}`} style={style} {...rest}>
      {children}
    </button>
  );
}
