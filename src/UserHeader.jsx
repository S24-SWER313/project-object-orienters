import React from 'react';

function UserHeader({ name, position, profilePic, timeStamp }) {
    return (
        <div>
            <img src={profilePic} alt="Profile" style={{ width: 60, height: 60, borderRadius: '50%' }} />
            <h5>{name}</h5>
            <p>{position}</p>
            <small>{timeStamp}</small>
        </div>
    );
}

export default UserHeader;
