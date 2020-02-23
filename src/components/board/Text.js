import React, {useEffect, useState} from 'react';
import {withAppContainer}           from '../../withAppContainer';
import {highlight}                  from '../../commons/highlight';

const Text = ({text, progress}) => {

    const [highlightedText, setHighlightedText] = useState(text);

    useEffect(() => {
        setHighlightedText(highlight(text, 0, progress, 'Match'));
    }, [text, progress]);


    return (
        <div>
            {highlightedText}
        </div>
    );
};

export default withAppContainer(Text);