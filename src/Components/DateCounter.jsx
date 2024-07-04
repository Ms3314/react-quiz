import { useReducer } from "react";
const initialState = { count  : 0 , step : 1}
function reducer(state, action) {
  console.log(state , action)
  // return {count : 0 , step : 1 }

  switch(action.type) {
    case "inc" :
      return { ...state , count : state.count + state.step };
    case "dec" : 
      return { ...state , count : state.count - state.step};
    case "set" :
      return { ...state , count : action.payload};
    case "slider" : 
      return { ...state , step : action.payload} ;
    case "reset" :
      return initialState
    default: 
      throw new Error("Unknown action")
  }
}

function DateCounter() {

  const [state , dispatch ] = useReducer(reducer , initialState)
  const {count , step} = state



  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // instead of just putting -1 or +1 we are using step so that later on you can change that 1 to 2 or yadayada 
    // setCount((count) => count - step);
    dispatch({type : 'dec' , payload : step})
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({type : 'inc' , payload : step})
  };

  const setCount = function (e) {
    dispatch({type : 'slider' , payload : Number(e.target.value)})
  };

  const defineCount = function (e) {
        dispatch({type : 'set' , payload : Number(e.target.value)})

  };

  // const defineStep = function (e) {
  //   setStep(Number(e.target.value));
  // };

  const reset = function () {
    dispatch({type : 'reset'})
    
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={setCount}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
