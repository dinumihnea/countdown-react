import React from 'react';
import moment from 'moment';

class Countdown extends React.Component {

    state: {
        now: null
    };

    componentWillMount(): void {
        this.setState({now: moment()})
    }

    componentDidMount() {
        this.tick();
    }

    tick = () => {
        const now = moment();
        if (this.getDiff() > 0) {
            this.setState({now});
            setTimeout(this.tick, 1000)
        }
    };

    getDiff = () => {
        const {target} = this.props;
        const {now} = this.state;
        if (target && now) {
            return target.diff(now, "milliseconds");
        } else {
            return 0;
        }
    };

    render() {
        const diff = this.getDiff();

        const days = Math.floor((((diff / 1000) / 60) / 60) / 24);
        const hours = Math.floor(((diff / 1000) / 60) / 60) % 24;
        const minutes = Math.floor((diff / 1000) / 60) % 60;
        const seconds = Math.floor(diff / 1000) % 60;
        return (
            <div className={'cd-countdown'}>
                <div className={'cd-countdown__item'}>
                    <div className={'cd-countdown-item__header'}>{days}</div>
                    <div className={'cd-countdown-item__subheader'}>Days</div>
                </div>
                <div className={'cd-countdown__item'}>
                    <div className={'cd-countdown-item__header'}>{hours}</div>
                    <div className={'cd-countdown-item__subheader'}>Hours</div>
                </div>
                <div className={'cd-countdown__item'}>
                    <div className={'cd-countdown-item__header'}>{minutes}</div>
                    <div className={'cd-countdown-item__subheader'}>Minutes</div>
                </div>
                <div className={'cd-countdown__item'}>
                    <div className={'cd-countdown-item__header'}>{seconds}</div>
                    <div className={'cd-countdown-item__subheader'}>Seconds</div>
                </div>
            </div>
        )
    }
}

export default Countdown;
