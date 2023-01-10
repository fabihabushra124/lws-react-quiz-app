import { useMemo } from 'react';
import successImg from '../assets/images/success.png';
import useFetch from '../hooks/useFetch';
import classes from '../styles/Summery.module.css';

export default function Summery({score, noq}) {
  const getImgKeyWord = useMemo(() => {
    console.log('Summery');
    if((score / (noq * 5)) * 100 < 50) {
      return 'failed';
    } if((score / (noq * 5)) * 100 < 75) {
      return 'good';
    } if((score / (noq * 5)) * 100 < 100) {
      return 'better';
    } 
    
    return 'excellent';
    
  }, [score, noq]); // It's calling 4 times at a time. To prevent it use useMemo(). But it's not a costly function. Use useMemo in the costly function, because useMemo() itself a costly function

  const {loading, error, result} = useFetch(
    `https://api.pexels.com/v1/search?query=${getImgKeyWord}&per_page=1`, 
    'GET', 
    {
      Authorization: process.env.REACT_APP_PEXELS_API_KEY
    }
  );

  // console.log(result);

  const image = result ? result.photos[0].src.medium : successImg;

  return (
    <div className={classes.summery}>
      <div className={classes.point}>
        <p className={classes.score}> 
            Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={classes.badge}>Loading your badge....</div>}
      {error && <div className={classes.badge}>There was an error!</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}