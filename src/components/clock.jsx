import React from 'react';
import TimerControl from './timercontrol';
import Display from './display';
import Controls from './controls';

const styles = {
    timersContainers: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '70vw',
        maxWidth: '700px',
        margin: 'auto'
    },
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
        if (action === 'play'){
            document.getElementsByClassName("fa-play")[0].style.display = 'none';
            document.getElementsByClassName("fa-pause")[0].style.display = 'block';
            this.setState({
                interval: setInterval(() => {
                    this.updateDisplay();
                }, 1000),
                paused: false,
                reset: false
            });
        }
        else {
            document.getElementsByClassName("fa-play")[0].style.display = 'block';
            document.getElementsByClassName("fa-play")[0].className = 'fa fa-play blink';
            document.getElementsByClassName("fa-pause")[0].style.display = 'none';
            let interval = this.state.interval;
            this.setState({
                interval: clearInterval(interval),
                paused: true,
                reset: true
            })
        }
    };

    reset = () => {
        document.getElementsByClassName("fa-play")[0].style.display = 'block';
        document.getElementsByClassName("fa-play")[0].className = 'fa fa-play';
        document.getElementsByClassName("fa-pause")[0].style.display = 'none';
        let interval = this.state.interval;
        this.setState({
            display: '25:00',
            breaktime: 5,
            sessiontime: 25,
            currentEvent: 'Session',
            paused: false,
            reset: true,
            currentMinutes:25,
            currentSeconds:0,
            interval: clearInterval(interval)
        })
    };

    updateDisplay = () => {
        let currentEvent = this.state.currentEvent.toLowerCase();
        let display = '';
        let currentMinutes = 0;
        let currentSeconds = 0;
        if (this.state.paused || this.state.reset){//update when user clicks on the arrow
            console.log("here");
            currentMinutes = this.state[currentEvent+'time'];
            display += currentMinutes + ':00';
            if (currentMinutes < 10){
                display = '0' + display;
            }
        }
        else {//update when a second is over
            console.log("or here");
            currentMinutes = this.state.currentMinutes;
            currentSeconds = this.state.currentSeconds - 1;
            if (currentSeconds === -1){
                currentSeconds = 59;
                currentMinutes--;
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
        console.log("then here", display);
        this.setState({
            display: display,
            currentMinutes: currentMinutes,
            currentSeconds: currentSeconds
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
            <div>
                Pomodoro Clock
            </div>
            <div style={styles.timersContainers}>
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
            <audio id="beep"/>
        </div>);
    }
}

export default Clock;
