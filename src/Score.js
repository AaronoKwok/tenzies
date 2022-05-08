import React from "react"; 

export default function Log(props) {
    function detScore() {
        let time = props.time.toString(); 
        let score;
        if (time.length === 1) {
            score = "0000" + time;
        } else if (time.length === 2) {
            score = "000" + time; 
        } else if (time.length === 3) {
            score = "00" + time; 
        } else if (time.length === 4) {
            score = "0" + time;
        } else {
            score = time; 
        }
        return score;
    }

    //send array of scores to local storage, get best one to display
    let bestScore = 35000;
    function sendLocStor() {
        console.log("working")
        bestScore = "taco";
        props.setScore(34)
        return "tacpo";
    }

    return (
        <div className="log">
            <button
                className="restart"
                onClick={props.restart}
            >
                Restart Game
            </button>

            <button 
                className="logScore"
                onClick={sendLocStor}
            >
                  Log Score 
            </button>

            <div className="score">
                <p>Score: {detScore()}</p>
                <p className="bestScore">Best Score: {props.score}</p>
            </div>
        </div>
        
    )
}

