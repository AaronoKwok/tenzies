import React from "react"; 

export default function Log(props) {
    console.log(props.time)
    
    return (
        <div>
            <button
                className="restart"
                onClick={props.restart}
            >
                Restart Game
            </button>

            <button className="logScore">
                  Log Score 
            </button>

            <div className="score">
                <p>Score: {props.time}</p>
                <p>Best Score: </p>
            </div>
        </div>
        
    )
}

