import React from 'react';

const displayStyles = {
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
            <div style={displayStyles.container}>
                <div id="timer-label"
                        style={displayStyles.label}>
                    {this.props.currentEvent}
                </div>
                <div id="time-left"
                        style={displayStyles.text}>
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default Display;
