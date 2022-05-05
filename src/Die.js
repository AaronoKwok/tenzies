import React from "react"; 
import One from "./Faces/One";
import Two from "./Faces/Two"; 
import Three from "./Faces/Three"; 
import Four from "./Faces/Four"; 
import Five from "./Faces/Five"; 
import Six from "./Faces/Six"; 

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    } 

    function value() {
        let num = props.value; 
        if (num === 1) {
            return <One />
        } else if (num === 2) {
            return <Two />
        } else if (num === 3) {
            return <Three /> 
        } else if (num === 4) {
            return <Four />
        } else if (num === 5) {
            return <Five />
        } else if (num === 6) {
            return <Six />
        }
    }

    //checks if dice have not been rolled yet. these dice have a isHeld value of null
    function nullCheck() {
        if (props.isHeld == null) {
            return null
        }
        return props.holdDie();
    }

    return (
        <div
            style={styles}
            className="die-face"
            onClick={nullCheck}
        >  
            {value()}
        </div>
    )
}