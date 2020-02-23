import React, {useEffect, useState, useRef} from 'react';
import {formatTime}                         from './formatTime';
import './styles.scss';

const Timer = ({time, onFinish, start}) => {

    const [countdown, setCountdown] = useState(formatTime(time));
    const intervalId = useRef(0);
    const timer = useRef(time);

    const startTimer = () => {

        intervalId.current = setInterval(() => {
            timer.current -= 1000;
            setCountdown(formatTime(timer.current));

            if (timer.current === 0) {
                clearInterval(intervalId.current);
                setCountdown(formatTime(timer.current));
                onFinish(timer.current);
            }

        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    useEffect(() => {

        if (start) {
            startTimer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start]);

    return (
        <div className={'timer'}>
            <span>{countdown}</span>
        </div>
    );
};

export default Timer;