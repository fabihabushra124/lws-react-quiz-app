import { useRef, useState } from 'react';
import classes from '../styles/ProgressBar.module.css';
import Button from './Button';

export default function ProgressBar({next, prev, submit, progress}) {
  const [tooltip, setToolTip] = useState(false);
  const toolTipRef = useRef();

  // eslint-disable-next-line no-unused-vars
  const toggleToolTip = () => {
    if(tooltip) {
      setToolTip(false);
      toolTipRef.current.style.display = 'none';
    } else {
      setToolTip(true);
      toolTipRef.current.style.left = `calc(${progress}% - 59px)`;
      toolTipRef.current.style.display = 'block';
    }
  };
  return (
    <div className={classes.progressBar}>
      <div className={classes.backBtn} onClick={prev} role='presentation'>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={toolTipRef}>{progress}% Complete!</div>
        <div className={classes.rangeBody}>
          <div 
            className={classes.progress} 
            style={{width: `${progress}%`}} 
            onMouseOver={toggleToolTip}
            onFocus={toggleToolTip}
            onMouseOut={toggleToolTip}
            onBlur={toggleToolTip}
          />
        </div>
      </div>
      {/* <Link to="/result"> */}
      <Button type="button" className={classes.next} onClick={progress === 100 ? submit : next}>
        <span>{progress === 100 ? 'Submit Quiz' : 'Next Question'}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
      {/* </Link> */}
    </div>
  );
}
