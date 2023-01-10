import { Fragment } from 'react';
import classes from '../styles/Answers.module.css';
import Checkbox from './Checkbox';

export default function Answers({options = [], handelChange, input}) {
  return (
    <div className={classes.answers}>
      {options.map((option, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={idx}>
          {input ? (
            <Checkbox 
              className={classes.answer} 
              text={option.title} 
              value={idx} 
              checked={option.checked} 
              onChange={(e) => handelChange(e, idx)}
            />
          ) : (
            <Checkbox 
              className={`${classes.answer} ${
                // eslint-disable-next-line no-nested-ternary
                option.correct 
                  ? classes.correct
                  : option.checked
                    ? classes.wrong 
                    : null
              }`} 
              text={option.title}  
              defaultChecked={option.checked} 
              disabled
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
