import React from "react"; 
import { nanoid } from "nanoid"; 
import Die from "./Die"; 
import Confetti from "react-confetti";

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [allHeld, setAllHeld] = React.useState(false);

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
        if (allHeld) {
            setAllHeld(false)
            setDice(allNewDice())
        }
        setDice(prevDice => {
            return prevDice.map(die => {
               return die.isHeld ? die : generateNewDie()
            })
        })
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
            {allHeld ? <Confetti /> : null}
        </main>
    )
}