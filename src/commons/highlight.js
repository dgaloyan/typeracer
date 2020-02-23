import React from 'react';

const Highlighted = ({children, color}) => {
    return (
        <span className={'text' + color}>
            {children}
        </span>
    );
};

export const highlight = (text, startIndex, endIndex, color) => {

    if (endIndex <= 0) {
        return text;
    }

    return (
        <>
            {text.substring(0, startIndex)}
            <Highlighted color={color}>
                {text.substring(startIndex, endIndex)}
            </Highlighted>
            {text.substring(endIndex)}
        </>
    );
};