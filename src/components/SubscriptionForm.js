import React from 'react';


class SubscriptionForm extends React.Component {

    // TODO validate submit

    render() {
        return (
            <form
                className={'cd-form-group'}
                onSubmit={this.props.onSubscribe}>
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
