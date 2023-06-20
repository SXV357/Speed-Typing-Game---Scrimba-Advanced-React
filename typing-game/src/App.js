import React, {useState, useEffect} from "react"
import './style.css';

export default function App() {

  const [text, setText] = useState("");
  const [startTimer, setStartTimer] = useState(false);
  const [numWords, setNumWords] = useState(0)
  const [time, setTime] = useState({
    initialTime: 10,
    modifiedTime: 10,
  })
  const [resetGame, setResetGame] = useState(false);
 
  const updateText = (e) => {
    setText(e.target.value)
  }

  const calculateNumWords = () => {
    let wordArray = text.length > 0 ? text.split(" ").filter(word => word !== "") : [];
    return wordArray.length;
  }

  useEffect(() => {
    let countdownTimer = time.modifiedTime > 0 && startTimer && setTimeout(() => {
      setTime(prevTime => ({...prevTime, modifiedTime: prevTime.modifiedTime - 1}))
    }, 1000)
    if (time.modifiedTime === 0){
      setStartTimer(false);
      setNumWords(calculateNumWords())
    };
    return () => {
      clearTimeout(countdownTimer);
    }
  }, [time.modifiedTime, startTimer])

  return (
    <div>
      <h1>SPEED TYPING GAME</h1>
      <textarea value = {text} name = "text" onChange = {(e) => updateText(e)}/>
      <h4>Time Remaining: {!resetGame ? time.modifiedTime: time.initialTime}</h4>
      <button onClick = {() => {
        setStartTimer(true);
        if (time.modifiedTime === 0){
          setText("");
          setNumWords(0);
          setResetGame(true);
        }
      }}>Start Game</button>
      <h1>Word Count: {time.modifiedTime === 0 && numWords}</h1>
    </div>
  );
}