import React from "react"
import useSpeedTyper from "./useSpeedTyper";
import './style.css';

export default function App() {
  const AVAILABLE_TIME = 10;
  const [textAreaElem, text, updateText, startTimer, timeRemaining, handleGame, numWords] = useSpeedTyper(AVAILABLE_TIME);

  return (
    <div>
      <h1>SPEED TYPING GAME</h1>
      <textarea ref = {textAreaElem} value = {text} name = "text" onChange = {(e) => updateText(e)} disabled = {!startTimer}/>
      <h4>Time Remaining: {timeRemaining}</h4>
      <button onClick = {handleGame} disabled = {startTimer}>Start Game</button>
      <h1>Word Count: {timeRemaining === 0 && numWords}</h1>
    </div>
  );
}