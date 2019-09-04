import React from 'react';
import TimerControl from './timercontrol';
import Display from './display';
import Controls from './controls';

const clockStyles = {
    timersContainers: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '70vw',
        maxWidth: '700px',
        margin: 'auto',
        padding: '13px'
    },
    header: {
        textAlign: 'center',
        fontSize: '24px',
        padding: '15px',
    }
};

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '25:00',
            breaktime: 5,
            sessiontime: 25,
            currentEvent: 'Session',
            paused: false,
            reset: true,
            currentMinutes:25,
            currentSeconds:0,
            interval: null
        };
    }

    playPause = (action) => {
        if ((this.state.reset && !this.state.paused) || (this.state.paused && this.state.reset)){
            document.getElementById("start_stop").className = "fa fa-pause";
            this.setState({
                interval: window.accurateInterval(() => {
                    this.updateDisplay();
                }, 1000),
                paused: false,
                reset: false
            });
        }
        else {
            document.getElementById("start_stop").className = "fa fa-play blink";
            this.state.interval.cancel();
            this.setState({
                interval: null,
                paused: true,
                reset: true
            })
        }
    };

    reset = () => {
        document.getElementById("start_stop").className = "fa fa-play";
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
        this.state.interval && this.state.interval.cancel();
        this.setState({
            display: '25:00',
            breaktime: 5,
            sessiontime: 25,
            currentEvent: 'Session',
            paused: false,
            reset: true,
            currentMinutes:25,
            currentSeconds:0,
            interval: null
        })
    };

    changeEvent = () => {
        document.getElementById("beep").play();
        if (this.state.currentEvent === 'Session'){
            return 'Break';
        }
        else return 'Session';
    };

    updateDisplay = () => {
        let currentEvent = this.state.currentEvent;
        let display = '';
        let currentMinutes = 0;
        let currentSeconds = 0;
        if (this.state.paused || this.state.reset){//update when user clicks on the arrow
            currentMinutes = this.state[currentEvent.toLowerCase()+'time'];
            display += currentMinutes + ':00';
            if (currentMinutes < 10){
                display = '0' + display;
            }
        }
        else {//update when a second is over
            currentMinutes = this.state.currentMinutes;
            currentSeconds = this.state.currentSeconds - 1;
            if (currentSeconds === -1){
                if (currentMinutes === 0){
                    currentEvent = this.changeEvent();
                    currentMinutes = this.state[currentEvent.toLowerCase()+'time'];
                    currentSeconds = 0;
                }
                else {
                    currentSeconds = 59;
                    currentMinutes--;
                }
            }
            display += currentMinutes + ':';
            if (currentMinutes < 10){
                display = '0' + display;
            }
            if (currentSeconds < 10){
                display += '0' + currentSeconds;
            }
            else {
                display += currentSeconds;
            }
        }
        this.setState({
            display: display,
            currentMinutes: currentMinutes,
            currentSeconds: currentSeconds,
            currentEvent: currentEvent
        });
    };

    increaseTimer = (type) => {
        let currentTimer = this.state[type+'time'];
        if (currentTimer === 60 || !this.state.paused && !this.state.reset) return;
        let newState = {};
        newState[type + 'time'] = currentTimer + 1;
        this.setState(newState, this.updateDisplay);
        ;
    };

    decreaseTimer = (type) => {
        let currentTimer = this.state[type+'time'];
        if (currentTimer === 1 || !this.state.paused && !this.state.reset) return;
        let newState = {};
        newState[type + 'time'] = currentTimer - 1;
        this.setState(newState);
        this.setState(newState, this.updateDisplay);
    };

    render() {
        return (<div>
            <div style={clockStyles.header}>
                Pomodoro Clock
            </div>
            <div style={clockStyles.timersContainers}>
                <div>
                    <TimerControl text="Break"
                                  display={this.state.breaktime}
                                  onIncrement={() => this.increaseTimer('break')}
                                  onDecrement={() => this.decreaseTimer('break')}
                                  currentEvent={this.state.currentEvent}/>
                </div>
                <div>
                    <TimerControl text="Session"
                                  display={this.state.sessiontime}
                                  onIncrement={() => this.increaseTimer('session')}
                                  onDecrement={() => this.decreaseTimer('session')}
                                  currentEvent={this.state.currentEvent}/>
                </div>
            </div>
            <Display text={this.state.display}
                     currentEvent={this.state.currentEvent}/>
            <Controls playPause={this.playPause}
                      reset={this.reset}
                      currentEvent={this.state.currentEvent}/>
                  <audio id="beep" src="http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav"
                          preload="auto"/>
        </div>);
    }
}

export default Clock;
