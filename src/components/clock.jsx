import React from 'react';
import TimerControl from './timercontrol';
import Display from './display';
import Controls from './controls';

class Clock extends React.Component {
    render () {
        return (
            <div>
                <TimerControl />
                <Display />
                <Controls />
            </div>
        );
    }
}

export default Clock;
