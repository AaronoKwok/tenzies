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

  //log score onClick, if all dice are held, then change score to the elapsed time
  function changeScore() {
    if (props.allHeld) {
      if (props.time < props.score) {
        props.setScore(props.time);
      }
    }
  }

  //score to send to storage
  React.useEffect(() => {
    let loggedScore = JSON.parse(localStorage.getItem("best score"));
    console.log("effect ran");
    if (loggedScore) {
      if (props.score < loggedScore) {
        localStorage.setItem("best score", JSON.stringify(props.score));
      }
    }
  }, [props.score, props.time]);

  console.log("component " + props.score);

  return (
    <div className="log">
      <button className="restart" onClick={props.restart}>
        Restart Game
      </button>

      <button className="logScore" onClick={changeScore}>
        Log Score
      </button>

      <div className="score">
        <p>Score: {detScore()}</p>
        <p className="bestScore">Best Score: {props.score}</p>
      </div>
    </div>
  );
}
