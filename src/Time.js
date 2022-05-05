import React from "react"; 

export default function Time(props) {
    return (
        <div>
                <span className="stopWatch">Duration of Play: </span>
                <span>{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>{/* 60000ms/min */}
                <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}</span>{/* 1000ms/s */}
                {/*<span>{("0" + ((time /10) % 100)).slice(-2)}</span> {/* divided ms by 10 to move decimal point to left so that you can see numbers change on screen */}              
        </div>
    )
}