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

const initialState = {
  questions : [] ,
  // this can be anything questions , loading , error
  status : "loading" ,
  // we need this index cause we need to pass the index of the question to the question component
  // so that we can siaplay the question question number wise 
  index : 0,
  answer : null,
  points : 0
}

function reducer (state , action) {
  switch (action.type) {
    case "dataRecieved" :
      return {...state , questions :action.payload , status : "ready"};
    case "dataFailed" :
      return {...state , status : "error"};
    case "start" :
      return {...state , status : "active"}
    case "newAnswer" : 
      const question = state.questions.at(state.index)
      return {
        ...state ,
        answer : action.payload ,
        points : action.payload === question.correctOption ? state.points + question.points : state.points
      }
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
  const [{questions , status , index , answer , points} , dispatch ] = useReducer(reducer , initialState)
  const noOfQns= questions.length
  // console.log(questions)
  return (
    <div className='app'>
      <Header />
      <Main className='main'>
        <h1>{status === 'loading' && <Loader/> }</h1>
        {status === 'error' && <Error/> }
        {status === 'ready' && <Start noOfQns={noOfQns} dispatch={dispatch}/>}
        {status === "active" && <Questions points={points} dispatch={dispatch} answer={answer} question = {questions[index]} />}
        {/* <p>Questions</p> */}
      </Main>

    </div>
  );
}

export default App;
