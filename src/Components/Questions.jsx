import Options from "./Options"
function Questions({numQuestions, index , question , points , answer , dispatch}) {
  console.log(question)
  if (numQuestions === undefined ) {
  return (
   <div>
    <h2>Quiz Completed !!</h2>
    <h3>You Earned Points : {points}</h3>
    <button className="btn" onClick={()=> dispatch({type : "resetGame"})} > Try Again </button>
  </div> 
  )
  }
  else {
    return (
      <div>
      <h4>{question.question}</h4>
      <Options dispatch={dispatch} index={index} points={points} answer={answer} question={question} options={question.options}/>
      <NextButton  dispatch={dispatch} answer ={answer} />
      </div>
    )
  }    
 
}

const NextButton =({dispatch , answer}) => {
  if (answer === null ) return 
  return (
    <div>
    <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>next</button>
    </div>
  )
}

export default Questions
