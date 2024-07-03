import { useReducer, useState } from "react";
function reducer(count, action) {
  console.log(count , action)
  
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const [count , dispatch ] = useReducer(reducer , 0 )
  const [step, setStep] = useState(1);

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
    // setStep(Number(e.target.value));
  };

  const defineCount = function (e) {
        // dispatch({type : 'set' , payload : Number(e.target.value)})

  };

  // const defineStep = function (e) {
  //   setStep(Number(e.target.value));
  // };

  const reset = function () {
    // dispatch({type : 'reset' , payload : 0})
    // setStep(1);
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
