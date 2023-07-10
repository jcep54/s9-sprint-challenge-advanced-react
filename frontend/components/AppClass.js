import React from 'react'
import axios from 'axios'

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
    let xCoor = 2;
    let yCoor = 2;
    if([0,3,6].includes(this.state.index)){
     xCoor = 1;
    }
    else if([1,4,7].includes(this.state.index)){
     xCoor = 2;
    }
    else{
     xCoor = 3;
    }

    if(this.state.index<3){
     yCoor = 1;
    }
    else if(this.state.index>5){
     yCoor = 3;
    }
    else{
     yCoor = 2;
    }
    return [xCoor,yCoor]
  }

  getXYMessage = () => {
    const [xCoor,yCoor] = this.getXY();
    return `(${xCoor},${yCoor})`
  }

  reset = (e) => {
   e.preventDefault();
   this.setState(initialState);
  }

  getNextIndex = (direction) => {
    
    const jump = direction.target.id;
    
    if (jump === 'up'){
      if (this.state.index<3)
        this.setState({...this.state, message:`You can't go up`})
      else
        this.move(this.state.index-3)
    }
    
    if (jump === 'down'){
      if (this.state.index>5)
      this.setState({...this.state, message:`You can't go down`})
      else
        this.move(this.state.index+3)
    }
    if (jump === 'left'){
      if (this.state.index%3 === 0)
      this.setState({...this.state, message:`You can't go left`})
      else
        this.move(this.state.index-1)
    }
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
    this.setState({...this.state, steps: this.state.steps +1, index: newIndex, message: ''});
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({...this.state, email: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const [xCoor, yCoor] = this.getXY();
    this.setState({...this.state, email: ''})
    axios.post(`http://localhost:9000/api/result`,{ 
      "x": xCoor,
      "y": yCoor,
      "steps": this.state.steps, 
      "email": this.state.email })
      .then(res =>{
        this.setState({...this.state,message:res.data.message})
      })
      .catch(err =>{
        console.error(err)
      })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXYMessage}</h3>
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
          <h3 id="message">{this.state.message}</h3>
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
