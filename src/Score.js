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
    function changeScore() {
        if (props.allHeld) {
            props.setScore(props.time);
        }
    }   
    
    //score to send to storage
    React.useEffect(() => { 
        let loggedScore = JSON.parse(localStorage.getItem("best score"));
        if (loggedScore) {
            if (loggedScore < props.score) {
                console.log(loggedScore)
            }
        } else {
            localStorage.setItem("best score", JSON.stringify(props.score))
        }
    }, [props.score])



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
                onClick={changeScore}
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

