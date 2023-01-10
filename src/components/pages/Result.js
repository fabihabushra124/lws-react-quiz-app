import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import useAnswers from '../../hooks/useAnswers';
import Analysis from '../Analysis';
import Summery from '../Summery';

export default function Result() {
  const {id} = useParams();
  const location = useLocation();
  const {state} = location;
  // eslint-disable-next-line no-unused-vars
  const {qna} = state; // Gives the checked true/false by the user

  const {loading, error, answers} = useAnswers(id); // answers gives the correct true from the database

  // console.log(location, answers);

  // Calculate teh score
  const calculate = () => {
    let score = 0;
    answers.forEach((question, idx1) => {
      const correctIdx = [];
      const checkedIdx = [];

      question.options.forEach((option, idx2) => {
        if(option.correct) correctIdx.push(idx2);
        if(qna[idx1].options[idx2].checked) {
          checkedIdx.push(idx2);
          // eslint-disable-next-line no-param-reassign
          option.checked = true;
        }
      });

      // eslint-disable-next-line operator-assignment
      if(_.isEqual(correctIdx, checkedIdx)) score = score + 5;
    });

    return score;
  };

  return (
    <>
      {loading && <div>Loading....</div>}
      {error && <div>There was an error!</div>}
      {answers && answers.length > 0 && (
        <>
          <Summery score={calculate()} noq={answers.length} />
          <Analysis answers={answers} score={calculate()} /> 
        </>
      )}     
    </>
  );
}
