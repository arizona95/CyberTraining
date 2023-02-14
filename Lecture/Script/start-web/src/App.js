//import logo from './logo.svg';
//import './App.css';

import React, {useEffect, useState} from "react"

function App(){
    const [sec, setSec] = useState(100);
    const [onoff, setOnoff] = useState(true);
    const [inputSec, setInputSec] = useState(0);
    const [inputMin, setInputMin] = useState(0);

    useEffect(()=>{
        console.log(inputMin)
        console.log(inputSec)
        console.log(sec)
        console.log(inputMin*60+inputSec)
        const counterVar = setInterval(() =>{

            if(onoff === true){
                if(sec>0){
                    setSec(parseInt(sec)-1)
                }
            }
        }, 1000)

        return () => clearInterval(counterVar)
    }, [sec, onoff]);

    return (
        <div className="App">
        <h1>Counter!</h1>
        <div>
            <h2>{parseInt(sec/60)}:{sec%60}</h2>
            <h3>
                {onoff===true?"running":"stopped"}
            </h3>
            <button onClick={()=>{
                setSec(parseInt(sec)+1)
            }} >increaser </button>

            <button onClick={()=>{
                setOnoff(onoff === true ? false:true)
            }} >stop-run </button>

            <input onChange = {(v)=> {setInputMin(parseInt(v.target.value))}}/>
            <input onChange = {(v)=> {setInputSec(parseInt(v.target.value))}}/>

            <button onClick={()=>{
                setSec(inputMin*60+inputSec);
            }} >setting-set</button>
        </div>
        </div>

    );
}

export default App;
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/