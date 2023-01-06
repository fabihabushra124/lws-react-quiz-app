import classes from '../styles/TextInput.module.css';

export default function TextInput({icon, ...rest}) {
  return (
    <div className={classes.textInput}>
      {/* <input type="text" placeholder="Enter name" /> */}

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...rest} />
      <span className="material-icons-outlined"> {icon} </span>
    </div>
  );
}
