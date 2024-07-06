import React from 'react'

function FinishScreen({highscore , points , maxPossiblePoints , dispatch}) {
    const percentage = (points / maxPossiblePoints) * 100
    const emoji = percentage === 100 ? "🥳" : percentage >= 50 ? "😎" : "😢"
  return (
    <>
    <p className='result' style={{paddingRight:"20px" , paddingLeft:"20px"}}>
      <span>{emoji}</span>  You scored <strong>{points}</strong> out of {maxPossiblePoints} (percentage : {Math.ceil(percentage)}%)
    </p>
    <p className='highscore'> HighScore : {highscore} points</p>
    <button className='btn btn-ui' onClick={()=> dispatch({type : "resetGame"})}>Restart</button>
    
    </>
  )
}

export default FinishScreen
