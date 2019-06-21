import React from 'react'

const MessageBox = props => (
    <div className={'cd-message-box'}>
        <div className={'cd-message-box__primary'}>{props.primary}</div>
        <div className={'cd-message-box__secondary'}>{props.secondary}</div>
    </div>
);

export default MessageBox
