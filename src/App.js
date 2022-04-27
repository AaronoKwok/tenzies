import React from "react"; 
import { nanoid } from "nanoid"; 
import Die from "./Die"; 

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())

    //Generate new Dice 
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false, 
            id: nanoid()
        }
    }

    //All new dice on first render
    function allNewDice() {
        const newDice = []; 
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice; 
    }

    //roll new dice
    function rollNewDice() {
        return setDice(allNewDice())
    }

    //diceElement components from Die.js
    const diceElements = dice.map(die => {
        return <Die 
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            roll={rollNewDice}
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
                Roll
            </button>
        </main>
    )
}