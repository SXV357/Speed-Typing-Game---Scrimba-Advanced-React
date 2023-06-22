import {useState, useEffect, useRef} from "react"

export default function useSpeedTyper(time_limit){
    const [text, setText] = useState("");
    const [startTimer, setStartTimer] = useState(false);
    const [numWords, setNumWords] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(time_limit);
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
          setTimeRemaining(time_limit);
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

      return [textAreaElem, text, updateText, startTimer, timeRemaining, handleGame, numWords];
}