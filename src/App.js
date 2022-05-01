import React from "react"; 
import { nanoid } from "nanoid"; 
import Die from "./Die"; 
import Confetti from "react-confetti";
//import Stopwatch from "./Stopwatch";

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [allHeld, setAllHeld] = React.useState(false);
    const [rolls, setRolls] = React.useState(0);

    //stopwatch state
    const [time, setTime] = React.useState(0);
    const [running, setRunning] = React.useState(false);

    //useEffect to watch for change in running state
    React.useEffect(() => {
        let interval; 
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10)
        } else if (!running) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [running])

    //useEffect to use an event listener that watches every time dice change
    React.useEffect(() => {
        if (dice.every(die => die.value === dice[0].value && die.isHeld === true)) {
           setAllHeld(true)
        }
    }, [dice])

    //Generate new Dice 
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false, 
            id: nanoid()
        }
    }

    //All new dice on first render and on "roll" button click
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice;
    }

    //roll new dice
    function rollNewDice() {
        setRolls(prevCount => prevCount + 1)
        setRunning(true)
        if (allHeld) {
            setRolls(1)
            setAllHeld(false)
            setDice(allNewDice())
            setRunning(false)
        }
        setDice(prevDice => {
            return prevDice.map(die => {
               return die.isHeld ? die : generateNewDie()
            })
        });
    }

    //restart game
    function restart() {
        if (rolls > 0) {
            setDice(allNewDice())
            setRolls(1)
            setAllHeld(false)
            setRunning(false)
            setTime(0)
        } 
    }

    //hold die
    function holdDie(id) {
        setDice(prevDice => (
             prevDice.map(die => {
                if (die.id === id) {
                    return {
                        ...die, 
                        isHeld: !die.isHeld
                    }
                } else {
                    return die;
                }
            })
        ))
    }
    
    //diceElement components from Die.js
    const diceElements = dice.map((die, index) => {
        return <Die 
            key={index}
            id={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDie={() => holdDie(die.id)}
        />
    })

    return (
        <main>
            <h1 className="title">Tenzies</h1>

            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </p>
            
            <div className="dice-container">
                {diceElements}
            </div>
            
            <button 
                className="rollDice"
                onClick={rollNewDice}
            >
                {allHeld ? "New Game" : "Roll"}
            </button>
            
            <h3>Number of rolls made: {rolls}</h3>
            
            <div>
                <div>
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                    <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                </div>
                <br />
            </div>
           
            <button
                className="restart"
                onClick={restart}
            >
                Restart Game
            </button>
            
            {allHeld ? <Confetti /> : null}
        </main>
    )
}