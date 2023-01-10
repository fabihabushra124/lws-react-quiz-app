import { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import classes from '../styles/MiniPlayer.module.css';

export default function MiniPlayer({id, title}) {
  const [status, setStatus] = useState(false);
  const buttonRef = useRef();
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  const toggleMiniPLayer = () => {
    if(status) {
      setStatus(false);
      buttonRef.current.classList.add(classes.floatingBtn);
    } else {
      setStatus(true);
      buttonRef.current.classList.remove(classes.floatingBtn);
    }
  };
  
  return (
    <div 
      className={`${classes.miniPlayer} ${classes.floatingBtn}`
      } 
      ref={buttonRef} 
      onClick={toggleMiniPLayer} 
      role='presentation'
    >
      <span 
        className={`material-icons-outlined ${classes.open}`}> play_circle_filled 
      </span>
      <span 
        className={`material-icons-outlined ${classes.close}`} 
        onClick={toggleMiniPLayer} 
        role='presentation'
      > 
      close 
      </span>
      <ReactPlayer 
        className={classes.player}
        url={videoUrl}
        playing={status}
        controls
      />
      <p>{title}</p>
    </div>
  ); 
}
