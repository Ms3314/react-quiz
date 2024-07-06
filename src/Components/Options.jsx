import React from 'react'

function Options({ question , dispatch , answer , points}) {
    const hasAnswered = answer !== null
  return (
    <div className='options'>
        {question.options.map((option , index) => {
            return <button  className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered && (index === question.correctOption ? 'correct' : "wrong")} `} disabled={hasAnswered} onClick={()=> dispatch({type : "newAnswer" , payload : index })} key={index}>{option}</button>
        })}
      </div>
  )
}

export default Options
