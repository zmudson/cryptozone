import React from 'react';

const SocialMediaLink = ({ URL, icon, target }) => {
    return (
        <li>
            <a href={URL} target={target} rel='noopener noreferrer'>
                <i className={icon}></i>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </a>
        </li>
    );
}

export default SocialMediaLink;