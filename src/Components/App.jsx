import { useReducer  , useEffect} from 'react';
import '../App.css';
import '../index.css'
import Main from './Main';
import Error from './Error';
// import DateCounter from './DateCounter';
import Header from './Header';
import Loader from './Loader';
import Start from './Start.jsx';
import Questions from './Questions.jsx'
import ProgressBar from './ProgressBar.jsx';
import FinishScreen from './FinishScreen.jsx';
import Timer from './Timer.jsx';
const SECS_PER_QUESTION = 30 
const initialState = {
  questions : [] ,
  // this can be anything questions , loading , error
  status : "loading" ,
  // we need this index cause we need to pass the index of the question to the question component
  // so that we can siaplay the question question number wise 
  index : 0,
  answer : null,
  points : 0 , 
  highscore : 0 , 
  secondsRemaining : null
}

function reducer (state , action) {
  switch (action.type) {
    case "dataRecieved" :
      return {...state , questions :action.payload , status : "ready"};
    case "dataFailed" :
      return {...state , status : "error"};
    case "start" :
      return {...state , status : "active" , secondsRemaining : state.questions.length*SECS_PER_QUESTION};
    case "nextQuestion" :
      return {...state , index : state.index + 1 , answer : null} ;
    case "endGame" : 
      return {...state , status : "finish" , highscore : state.points > state.highscore ? state.points : state.highscore}
    case "resetGame" :
      return {...state , index : 0 , answer : null , points : 0 , status : "ready"};
    case "newAnswer" : 
      const question = state.questions.at(state.index)
      return {
        ...state ,
        answer : action.payload ,
        points : action.payload === question.correctOption ? state.points + question.points : state.points
      };
    case "tick" : 
    return {...state , secondsRemaining : state.secondsRemaining - 1 , status : state.secondsRemaining <= 0 ? "finish" : state.status }
    case "reset" :
    return {...state , secondsRemaining : state.questions.length*SECS_PER_QUESTION}
    default:  
    throw new Error("Unknown action")
  }
}

function App() {
  useEffect(()=> {
    async function fetchQuestion () {
        fetch("http://localhost:8000/questions").then(res => res.json()).then(data => dispatch({type : 'dataRecieved' , payload : data})).catch(err => dispatch({type : 'dataFailed'  }))
    }
    fetchQuestion()
},[])

// all the states must be destructures to be used in the component
  const [{secondsRemaining , questions , status , index , answer , points , highscore} , dispatch ] = useReducer(reducer , initialState)
  const noOfQns= questions.length
  // console.log(questions)
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((acc , question) => acc + question.points , 0)
  return (
    <div className='app'>
      <Header />
      <Main className='main'>
        <h1>{status === 'loading' && <Loader/> }</h1>
        {status === 'error' && <Error/> }
        {status === 'ready' && <Start noOfQns={noOfQns} dispatch={dispatch}/>}
        {status === "active" &&
        <>
         <ProgressBar points={points} index={index} numQuestions={numQuestions} maxPossiblePoints={maxPossiblePoints}/>
         <Questions numQuestions={numQuestions} index={index} points={points} dispatch={dispatch} answer={answer} question = {questions[index]} />
         <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
        </>
        }
        {status === "finish" && <FinishScreen highscore={highscore} dispatch={dispatch} points={points} maxPossiblePoints={maxPossiblePoints}/> }
      </Main>

    </div>
  );
}

export default App;
