import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {actualTimerValue : 0, startTimerValue: this.timeByNow(), seconds: '00', minutes : '00', hours: '00'}
    this.timeByNow = this.timeByNow.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }
  
  timeByNow () {
    let date = new Date(Date.now()).getTime();
    return date;
  }
  
  getSeconds(time) {
   return time % 60
  }
  
  getMinutes(time) {
    return Math.floor(time / 60)
  }
  
  showTimerStyle({minutes, seconds}) {
    let strMin = minutes.toString().length < 2 ? `0${minutes}` : minutes
    let strSec = seconds.toString().length < 2 ? `0${seconds}` : seconds
    return `${strMin}:${strSec}`
  }
  
  updateTime () {
    setInterval(() => {
      let newDate = this.timeByNow()
      
      let actualValue = Math.floor((this.timeByNow() - this.state.startTimerValue) / 1000)
      
      let seconds = this.getSeconds(actualValue)
      
      let minutes = this.getMinutes(actualValue)
      
      this.setState({actualTimerValue: actualValue, 
                     seconds: seconds, minutes: minutes})
      
    }, 1001)
  }
  
  componentDidMount () {    
    this.updateTime();
  }
  
  render() {
    return (
      <div>
        <p>{this.showTimerStyle({minutes: this.state.minutes, seconds: this.state.seconds})}</p>
      </div>
     
    )
  }
  
}

export default Timer;

/*const mapDispatchToProps = function(dispatch) {
  return {
    startTimer: function(e) {
      dispatch(actions.viewCard(e.target));
    }
  }
}

const ConnectedBoard = connect(mapDispatchToProps)(Timer);

export default ConnectedTimer;*/

