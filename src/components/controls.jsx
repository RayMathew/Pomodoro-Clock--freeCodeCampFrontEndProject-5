import React from 'react';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100px',
        margin: 'auto',
        fontSize: '24px',
        padding: '20px'
    }
};


class Controls extends React.Component {
    render () {
        return (
            //when it is paused, only the play button should be visible, and it should blink, to indicate that the user needs
            // to click it to continue the timer
            <div style={styles.container}>
                <i className="fa fa-play"
                    id="start_stop"
                    onClick={() => this.props.playPause('play')}></i>
                <i className="fa fa-pause"
                    id="start_stop"
                    onClick={() => this.props.playPause('pause')}></i>
                <i className="fa fa-refresh"
                    id="reset"
                    onClick={() => this.props.reset()}></i>
            </div>
        );
    }
}

export default Controls;
