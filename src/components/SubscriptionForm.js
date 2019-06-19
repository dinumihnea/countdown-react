import React from 'react';


class SubscriptionForm extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.onSubscribe}>
                <input
                    className={'cd-input cd-input--rounded'}
                    type="email"
                    name="email"/>
                <button
                    className={'cd-button cd-button--rounded'}
                >Subscribe</button>
            </form>
        )
    }
}

export default SubscriptionForm;
