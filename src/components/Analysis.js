import Question from './Question';

export default function Analysis() {
  return (
    <div style={{margin: "2rem auto"}}>
      <h1>Question Analysis</h1>
      <h4>You answerd 5 out of 10 questions correctly</h4>
      <Question />
    </div>
  );
}
