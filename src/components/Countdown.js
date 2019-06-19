import React from 'react';
import moment from 'moment';

class Countdown extends React.Component {

    state: {
        now: {};
    };

    componentWillMount(): void {
        this.setState({now: moment()})
    }

    componentDidMount() {
        this.tick();
    }

    tick = () => {
        const now = moment();
        if (this.props.target > now) {
            this.setState({now});
            setTimeout(this.tick, 1000)
        }
    };

    render() {
        console.log(this.state);
        const diff = this.props.target - this.state.now;
        const days = Math.floor((((diff / 1000) / 60) / 60) / 24);
        const hours = Math.floor(((diff / 1000) / 60) / 60) % 24;
        const minutes = Math.floor((diff / 1000) / 60) % 60;
        const seconds = Math.floor(diff / 1000) % 60;
        return (
            <div>
                <div>{days}</div>
                <div>{hours}</div>
                <div>{minutes}</div>
                <div>{seconds}</div>
            </div>
        )
    }
}

export default Countdown;
