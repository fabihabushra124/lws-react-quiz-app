import classes from '../styles/Question.module.css';
import Answers from './Answers';

export default function Questions({answers = []}) {
  return answers.map((answer, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <div className={classes.question} key={idx}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline</span>
        Here goes the question from Learn with Sumit?
      </div>
      <Answers input={false} options={answer.options} />
    </div>
  ));
}
