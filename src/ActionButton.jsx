import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as farThumbsUp, faComment as farComment } from '@fortawesome/free-regular-svg-icons';
import { faShareSquare as fasShareSquare } from '@fortawesome/free-solid-svg-icons';  // Solid style for share

const ActionButton = (props) => {
    let icon;
    switch (props.icon) {
        case 'like':
            icon = farThumbsUp;
            break;
        case 'comment':
            icon = farComment;
            break;
        case 'share':
            icon = fasShareSquare;
            break;
        default:
            icon = null;  // Set to null or any default icon you wish to show
    }

    return (
        <button onClick={() => console.log('Button clicked!')}>
            {icon && <FontAwesomeIcon icon={icon} size="2x" />}
            {props.text}
        </button>
    );
};

export default ActionButton;
