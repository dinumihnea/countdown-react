import React from 'react';
import './styles/main.sass';
import SubscriptionForm from './components/SubscriptionForm';
import { subscribe } from './api/api';
import Countdown from './components/Countdown';
import moment from 'moment';
import Header from "./components/Header";

// TODO receive from the backend
const target = moment("2019 06 29", 'YYYYMMDD');

class App extends React.Component {

    onSubscribe = (e) => {
        e.preventDefault();
        // TODO validate
        subscribe(e.target.elements.email.value);
        e.target.elements.email.value = ''
    };


    render() {
        return (
            <div className="App">
                <Header />
                <div className="container">
                    <Countdown target={target} />
                    <SubscriptionForm onSubscribe={this.onSubscribe} />
                </div>
            </div>
        );
    }
}

export default App;
