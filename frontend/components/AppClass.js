import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {

  constructor(){
    super();
    this.state = initialState;
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = (e) => {
   e.preventDefault();
   this.setState(initialState);
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const jump = direction.target.id;
    //up move
    if (jump === 'up'){
      if (this.state.index<3)
        this.setState({...this.state, message:`You can't go up`})
      else
        this.move(this.state.index-3)
    }
    //down move
    if (jump === 'down'){
      if (this.state.index>5)
      this.setState({...this.state, message:`You can't go down`})
      else
        this.move(this.state.index+3)
    }
    //left move
    if (jump === 'left'){
      if (this.state.index%3 === 0)
      this.setState({...this.state, message:`You can't go left`})
      else
        this.move(this.state.index-1)
    }
    //right move
    if (jump === 'right'){
      if ([2,5,8].includes(this.state.index))
      this.setState({...this.state, message:`You can't go right`})
      else
        this.move(this.state.index+1)
    }
  }

  move = (newIndex) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.setState({...this.state, steps: this.state.steps +1, index: newIndex});
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({...this.state, email: e.target.value});
  }

  onSubmit = (e) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.getNextIndex}>LEFT</button>
          <button id="up" onClick={this.getNextIndex}>UP</button>
          <button id="right" onClick={this.getNextIndex}>RIGHT</button>
          <button id="down" onClick={this.getNextIndex}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input 
          id="email" 
          type="email"
          placeholder="type email"
          value={this.state.email}
          onChange={this.onChange}
          />
          <input id="submit" type="submit"/>
        </form>
      </div>
    )
  }
}
