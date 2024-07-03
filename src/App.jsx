import './App.css';
import './index.css'
import Main from './Main';
import Error from './Error';
// import DateCounter from './DateCounter';
import Header from './Header';
import Loader from './Loader';
import Start from './Start.jsx';
import { useReducer  , useEffect} from 'react';
const initialState = {
  questions : [],

  // this can be anything questions , loading , error
  status : "loading"
}

function reducer (state , action) {
  switch (action.type) {
    case "dataRecieved" :
      return {...state , questions :action.payload , status : "ready"};
    case "dataFailed" :
      return {...state , status : "error"}
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
  const [{questions , status } , dispatch ] = useReducer(reducer , initialState)
  const noOfQns= questions.length
  return (
    <div className='app'>
      <Header />
      <Main className='main'>
        <h1>{status === 'loading' && <Loader/> }</h1>
        <p>{status === 'error' && <Error/> }</p>
        
        <p>{status === 'ready' && <Start noOfQns={noOfQns}/>   }</p>
        {/* <p>Questions</p> */}
      </Main>

    </div>
  );
}

export default App;
