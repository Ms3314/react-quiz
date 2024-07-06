import Options from "./Options"
function Questions({numQuestions, index , question , points , answer , dispatch}) {
  // console.log(question)
  // becuz index stasts like 0 , 2 ... but the num of questions will be from one so for that reason cause we dont want the least one right 
  
  // return (
  //  <div>
  //   <h2>Quiz Completed !!</h2>
  //   <h3>You Earned Points : {points}</h3>
  //   <button className="btn" onClick={()=> dispatch({type : "resetGame"})} > Try Again </button>
  // </div> 
  // )
  // }
  // else {
    return (
      <div>
      <h4>{question.question}</h4>
      <Options dispatch={dispatch} index={index} points={points} answer={answer} question={question} options={question.options}/>
      <NextButton  dispatch={dispatch} answer ={answer} index={index} numQuestions={numQuestions}/>
      
      </div>
    )
  }    
 


const NextButton =({dispatch , answer , index , numQuestions}) => {
  const checker =  (index < numQuestions - 1 ) 
  if (answer === null) return null
  return (

  <>
  {checker ? <div>
    <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>next</button>
    </div> : 
    (<div>
    <button className="btn btn-ui" onClick={()=>dispatch({type:"endGame"})}>Submit</button>
    </div>)
}
  </>
  )

}

export default Questions
