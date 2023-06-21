import React, {useState, useEffect, useRef} from "react"
import './style.css';

export default function App() {
  const AVAILABLE_TIME = 10;

  const [text, setText] = useState("");
  const [startTimer, setStartTimer] = useState(false);
  const [numWords, setNumWords] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(AVAILABLE_TIME);
  const textAreaElem = useRef(null);

  function updateText(e){
    const {value} = e.target;
    setText(value);
  }

  function calculateNumWords(){
    let wordArray = text.length > 0 ? text.split(" ").filter(word => word !== "") : [];
    return wordArray.length;
  }

  function handleGame(){
    setStartTimer(true);
    if (timeRemaining === 0){
      setText("");
      setNumWords(0);
      setStartTimer(true);
      setTimeRemaining(AVAILABLE_TIME);
    }
  }

  useEffect(() => {
    textAreaElem.current.focus();
  }, [startTimer])

  useEffect(() => {
    let countdownTimer = timeRemaining > 0 && startTimer && setTimeout(() => {
      setTimeRemaining(prevRemaining => prevRemaining - 1)
    }, 1000)

    if (timeRemaining === 0){
      setStartTimer(false);
      setNumWords(calculateNumWords())
    };

    return () => {
      clearTimeout(countdownTimer);
    }
  }, [timeRemaining, startTimer])

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