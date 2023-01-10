import Questions from './Questions';

export default function Analysis({answers, score}) {
  return (
    <div style={{margin: "2rem auto"}}>
      <h1>Question Analysis</h1>
      <h4>You answerd {score / 5} out of {answers.length} questions correctly</h4>
      <Questions answers={answers} />
    </div>
  );
}
