import React from 'react';

//stopped, paused, break, session, reset

const styles = {
    container: {
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        border: '1px solid black',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: '24px',
        padding: '5px'
    },
    text: {
        fontSize: '50px'
    }
};

class Display extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <div style={styles.container}>
                <div id="timer-label"
                        style={styles.label}>
                    {this.props.currentEvent}
                </div>
                <div id="time-left"
                        style={styles.text}>
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default Display;
