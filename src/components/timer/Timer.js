import React, {useEffect, useState, useRef, useCallback} from 'react';
import {formatTime}                                      from './formatTime';
import './styles.scss';

const Timer = ({time, onFinish }) => {

    const [start, toggleStart] = useState(false);
    const [countdown, setCountdown] = useState(formatTime(time));
    const intervalId = useRef(0);
    const timer = useRef(time);

    const toggleTimer = useCallback(() => {

        intervalId.current = setInterval(() => {
            setCountdown(formatTime(--timer.current));

            if (timer.current === 0) {
                clearInterval(intervalId.current);
                setCountdown(formatTime(timer.current));
                onFinish && onFinish()
            }

        }, 1000);
    }, [setCountdown, onFinish]);

    useEffect(() => {

        if (start) {
            toggleTimer();
        } else {
            clearInterval(intervalId.current);
            onFinish && onFinish()
        }

    }, [start, toggleTimer, onFinish]);

    return (
        <div className={'timer'}>
            <span>{countdown}</span>
            <button onClick={() => toggleStart(!start)}>{start ? 'Stop' : 'Start'}</button>
        </div>
    );
};

export default Timer;