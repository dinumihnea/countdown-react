import React from 'react';
import { subscriberService } from "../services/subscriber-service";
import MessageBox from "./MessageBox";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SubscriptionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: true,
            responseMessage: ''
        }
    }

    static isValidEmail(email) {
        return EMAIL_REGEX.test(email)
    }

    checkResponse(response) {
        if (response.status === 201) {
            this.setState({
                hasError: false,
                responseMessage: 'Successfully created',
            })
        } else if (response.status === 409) {
            this.setState({
                hasError: true,
                responseMessage: 'Already exists',
            })
        } else if (response.status === 403) {
            this.setState({
                hasError: true,
                responseMessage: 'Invalid email'
            })
        }
    }

    subscribe = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        if (SubscriptionForm.isValidEmail(email)) {
            e.target.elements.email.value = '';
            const response = await subscriberService.insertSubscriber(email);
            this.checkResponse(response);
        } else {
            this.setState({
                hasError: false,
                responseMessage: 'Invalid email'
            })
        }
    };

    render() {
        const notificationType = this.state.hasError ? 'error' : 'success';
        return (
            <React.Fragment>
                <MessageBox
                    primary={"Email Notification"}
                    secondary={"Subscribe to receive a notification when countdown finishes"} />
                <form
                    className={'cd-form-group'}
                    onSubmit={this.subscribe}>
                    <input
                        className={'cd-input cd-input--rounded'}
                        type="email"
                        name="email" />
                    <button
                        className={'cd-button cd-button--rounded'}
                    >Subscribe
                    </button>
                    <div className={`cd-form-group__notification cd-form-group__notification--${notificationType}`}>
                        {this.state.responseMessage}
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default SubscriptionForm;
