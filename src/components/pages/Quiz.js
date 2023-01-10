import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash'; // Helps to clone/copy deeply
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useQuestions from '../../hooks/useQuestions';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';

const initialState = null;

const reducer = (state, action) => {
  switch(action.type) {
    case 'questions':
      action.value.forEach(question => {
        question.options.forEach(option => { 
          // eslint-disable-next-line no-param-reassign
          option.checked = false;
        }); // It adds the checked property within the firebase "questions" node
      });

      return action.value; // returns true or false

    case 'answer': {
      const questions = _.cloneDeep(state);
      questions[action.questionId].options[action.optionIdx].checked = action.value;

      return questions; // Copied the "questions" node
    }

    default: {
      return state;
    }
  }
};

export default function Quiz() {
  const {id} = useParams(); // URL videos id pparameter from App
  const {loading, error, questions} = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState); // The copied 'questions' with checked property will be stored in 'qna'
  const {currentUser} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const {state} = location;
  const {videoTitle} = state;

  useEffect(() => {
    dispatch({
      type: 'questions',
      value: questions
    });
  }, [questions]);

  const handelAnsChange = (e, idx) => {
    dispatch({
      type: 'answer',
      questionId: currentQuestion,
      optionIdx: idx,
      value: e.target.checked
    });
  };

  // Handel when user clicks the next button to get the next question
  const nextQuestion = () => {
    if(currentQuestion + 1 < questions.length)
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
  };

  // Handel when user clicks the back button to get the previous question
  const prevQuestion = () => {
    if(currentQuestion >= 1 && currentQuestion <= questions.length)
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
  };

  // Calculate percentage of progress
  const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // Submit quiz answers to firebase database
  const submit = async () => {
    // console.log(currentUser);

    const {uid} = currentUser; // Firebase gives the user id in uid

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    // Send to database
    await set(resultRef, {
      [id]: qna
    });

    navigate(`/result/${id}`, {
      state: {
        qna
      }
    });
  };
  return (
    <>
      {/* {console.log(qna)} */}
      {loading && <div>Loading....</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers 
            input
            options={qna[currentQuestion].options} 
            handelChange={handelAnsChange} 
          />
          <ProgressBar 
            next={nextQuestion} 
            prev={prevQuestion} 
            submit={submit} 
            progress={percentage} 
          />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}

/* Copy the whole 'question' node to get the result node */