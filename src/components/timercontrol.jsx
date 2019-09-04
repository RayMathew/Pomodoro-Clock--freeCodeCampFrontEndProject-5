import React from 'react';


let timerControlStyles = {
    parent: {
        textAlign: 'center'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        padding: '5px'
    },
    timerValue: {
        border: '1px solid black',
        borderRadius: '50%',
        padding: '10px',
        width: '20px',
        height: '20px'
    }
};

class TimerControl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            containerWidth: '150px'
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    resize() {
        if(window.innerWidth <= 760){
            this.setState({
                containerWidth: '110px'
            });
        }
        else {
            this.setState({
                containerWidth: '150px'
            });
        }
    }
    render () {
        return (
            <div style={{...timerControlStyles.parent, width: this.state.containerWidth}}>
                <div id={this.props.text.toLowerCase() + '-label'}
                    style={timerControlStyles.label}>
                    {this.props.text}
                </div>
                <div style={{...timerControlStyles.container, width: this.state.containerWidth}}>
                    <button onClick={this.props.onDecrement}
                            id={this.props.text.toLowerCase() + "-decrement"}>
                        <i className="fa fa-minus"></i>
                    </button>
                    <div id={this.props.text.toLowerCase() + '-length'}
                            style={timerControlStyles.timerValue}>
                        {this.props.display}
                    </div>
                    <button onClick={this.props.onIncrement}
                            id={this.props.text.toLowerCase() + "-increment"}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default TimerControl;
