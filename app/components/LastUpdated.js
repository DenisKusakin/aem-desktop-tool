import React from "react";
const moment = require('moment');

const computeText = time => {
    return moment(time).fromNow();
}

class LastUpdated extends React.Component {
    constructor(props){
        super(props);
        this.updateState = time => () => {
            let text = computeText(time);
            this.setState({text})
        };
        this.state = !props.time ? null : {
            text: computeText(props.time)
        }
    }

    componentWillReceiveProps(nextProps){
        clearInterval(this.timerId)
        this.timerId = setInterval(this.updateState(nextProps.time), 1000)
    }

    componentDidMount(){
        this.timerId = setInterval(this.updateState(this.props.time), 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timerId)
    }

    render(){
        return (
            <span>
                {this.state !== null ? "(" + this.state.text + ")" : ""}
            </span>
        )
    }
}

export default LastUpdated;