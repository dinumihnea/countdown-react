import React from 'react';
import './styles/main.sass';
import SubscriptionForm from './components/SubscriptionForm';
import Countdown from './components/Countdown';
import Header from "./components/Header";
import { countdownService } from "./services/countdown-service";
import moment from "moment";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            target: null,
            errorMessage: ''
        }
    }

    async componentDidMount(): void {
        try {
            const countdownTarget = await countdownService.getTarget();
            this.setState({target: moment(countdownTarget)});
        } catch (error) {
            this.setState({target: moment()});
            console.log(error)
        }
    }

    render() {
        if (this.state.target) {
            return (
                <div className="cd-app">
                    <div className="cd-overlay">
                        <Header />
                        <div className="cd-main-layout">
                            <div className="cd-main-container">
                                <Countdown target={this.state.target} />
                                <SubscriptionForm />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>Loading</div>
        }
    }
}

export default App;
