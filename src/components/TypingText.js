import React from 'react';
import Typist from 'react-typist';

const TypingText = ({ text, className }) => {
    return (
        <Typist
            avgTypingSpeed={40}
            startDelay={1000}
        >
            <h2 className={className}>{text}</h2>
        </Typist>
    );
}

export default TypingText;
