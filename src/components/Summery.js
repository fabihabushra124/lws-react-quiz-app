import successImg from '../assets/images/success.png';
import classes from '../styles/Summery.module.css';

export default function Summery() {
  return (
    <div className={classes.summery}>
      <div className={classes.point}>
        <p className={classes.score}> 
            Your score is <br />
            5 out of 10
        </p>
      </div>

      <div className={classes.badge}>
        <img src={successImg} alt="Success" />
      </div>
    </div>
  );
}
