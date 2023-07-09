import React from 'react'
import {useState} from 'react'
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

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
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset(e) {
    e.preventDefault();
    setIndexOfB(4);
    setSteps(0);
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    const jump = direction.target.id;
    //up move
    if (jump === 'up'){
      if (indexOfB<3)
        console.log('invalid move')
      else
        move(indexOfB-3)
    }
    //down move
    if (jump === 'down'){
      if (indexOfB>5)
        console.log('invalid move')
      else
        move(indexOfB+3)
    }
    //left move
    if (jump === 'left'){
      if (indexOfB%3 === 0)
        console.log('invalid move')
      else
        move(indexOfB-1)
    }
    //right move
    if (jump === 'right'){
      if ([2,5,8].includes(indexOfB))
        console.log('invalid move')
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
    // e.preventDefault();
    setEmailVal(e.target.value);
    
  }

  function onSubmit(e) {
    e.preventDefault();
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        {/* change coordinates and steps to dynamic vars from state */}
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved {steps} times</h3>
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
         <h3 id="message">{/*add message errors*/}</h3>
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
