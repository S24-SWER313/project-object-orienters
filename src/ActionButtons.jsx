import React from 'react';
import ActionButton from './ActionButton';

const ActionButtons = () => {
    // Your component logic goes here

    return (
        <div>
            <ActionButton icon="like"/> &nbsp;
            <ActionButton icon="comment"/>&nbsp;&nbsp;
            <ActionButton icon="share"/>
        </div>
    );
};

export default ActionButtons;
