import React, { useState, useEffect } from "react";
import "./styles.css"

export default function App() {
  const [seconds, setSeconds] = useState(100);
  const [onoff, setOnoff] = useState(true);
  const [inputMin, setInputMin] = useState(0);
  const [inputSec, setInputSec] = useState(0);

  useEffect(() => {
    if (onoff === true){
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) <= 0) {
          clearInterval(countdown);
        }
      }, 1000);

      return ()=> clearInterval(countdown)
    }
  }, [seconds, onoff]);

  return (
    <div className="App">
      <h1>CountDown!</h1>
      <div>
        <h2>
          {parseInt(seconds/60)}:{seconds%60}
        </h2>
        <h3>
          {onoff===true?"running":"stopped"}
        </h3>
      </div>
      <button onClick={()=>{setSeconds(parseInt(seconds+1))}}> plus-one </button>
      &nbsp;<button onClick={()=>{setSeconds(0)}}>to-zero</button>
      &nbsp;<button onClick={()=>{setOnoff(onoff === true?false:true)}}>timer-onoff</button>
      &nbsp;<input onChange = {(i)=>{setInputMin(parseInt(i.target.value))}}/>
      &nbsp;:&nbsp;<input onChange = {(i)=>{setInputSec(parseInt(i.target.value))}}/>
      &nbsp;<button onClick={()=>{setSeconds(60*inputMin+inputSec)}}>setting-timer</button>
    </div>
  );
}
