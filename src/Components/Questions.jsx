import Options from "./Options"
function Questions({question , points , answer , dispatch}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options dispatch={dispatch} points={points} answer={answer} question={question} options={question.options}/>
    </div>
  )
}

export default Questions
