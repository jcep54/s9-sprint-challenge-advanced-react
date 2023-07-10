import React from 'react'
import {useState} from 'react'
import axios from 'axios';


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [indexOfB, setIndexOfB] = useState(4);
  const [emailVal, setEmailVal] = useState('');
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState('');

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let xCoor = 2;
    let yCoor = 2;
    if([0,3,6].includes(indexOfB)){
     xCoor = 1;
    }
    else if([1,4,7].includes(indexOfB)){
     xCoor = 2;
    }
    else{
     xCoor = 3;
    }

    if(indexOfB<3){
     yCoor = 1;
    }
    else if(indexOfB>5){
     yCoor = 3;
    }
    else{
     yCoor = 2;
    }
    return [xCoor,yCoor]
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const [xCoor,yCoor] = getXY();
    return `(${xCoor},${yCoor})`
  }

  function reset(e) {
    e.preventDefault();
    setIndexOfB(4);
    setSteps(0);
    setEmailVal('');
    setMessage('');
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    setMessage('')
    const jump = direction.target.id;
    //up move
    if (jump === 'up'){
      if (indexOfB<3)
        setMessage(`You can't go up`)
      else
        move(indexOfB-3)
    }
    //down move
    if (jump === 'down'){
      if (indexOfB>5)
      setMessage(`You can't go down`)
      else
        move(indexOfB+3)
    }
    //left move
    if (jump === 'left'){
      if (indexOfB%3 === 0)
      setMessage(`You can't go left`)
      else
        move(indexOfB-1)
    }
    //right move
    if (jump === 'right'){
      if ([2,5,8].includes(indexOfB))
      setMessage(`You can't go right`)
      else
        move(indexOfB+1)
    }
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(newIndx) {
    setSteps(steps+1)
    setIndexOfB(newIndx)
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(e) {
    e.preventDefault();
    setEmailVal(e.target.value);
    
  }

  function onSubmit(e) {
    e.preventDefault();
    const [xCoor, yCoor] = getXY();
    setEmailVal('');
    axios.post(`http://localhost:9000/api/result`,{ 
      "x": xCoor,
      "y": yCoor,
      "steps": steps, 
      "email":emailVal })
      .then(res =>{
        setMessage(res.data.message)
      })
      .catch(err =>{
        setMessage(err.response.data.message)
      })
      
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        {/* change coordinates and steps to dynamic vars from state */}
        <h3 id="coordinates">Coordinates {getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1? 'time':'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            //change 4 to dynamic value i.e. index of b
            <div key={idx} className={`square${idx === indexOfB ? ' active' : ''}`}>
              {idx === indexOfB ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
         <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={getNextIndex}>LEFT</button>
        <button id="up" onClick={getNextIndex}>UP</button>
        <button id="right" onClick={getNextIndex}>RIGHT</button>
        <button id="down" onClick={getNextIndex}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
          id="email" 
          type="email" 
          placeholder="type email"
          value={emailVal}
          onChange={onChange}
          />
        
        <input 
          id="submit" 
          type="submit"
          />
      </form>
    </div>
  )
}
