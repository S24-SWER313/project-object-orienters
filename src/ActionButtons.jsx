import React from 'react';
import ActionButton from './ActionButton';

const ActionButtons = () => {
    // Your component logic goes here

    return (
        <div>
            <ActionButton icon="like" text="Like" />
            <ActionButton icon="comment" text="Comment" />
            <ActionButton icon="share" text="Share" />
        </div>
    );
};

export default ActionButtons;