import React, {useCallback, useEffect, useRef, useState} from 'react'
import {formatTime}                                      from './formatTime'
import './styles.scss'

const Timer = ({time, onFinish, start, finished}) => {

    const [countdown, setCountdown] = useState(formatTime(time))
    const intervalId                = useRef(0)
    const timer                     = useRef(time)

    const startTimer = useCallback(() => {

        intervalId.current = setInterval(() => {
            timer.current -= 1000
            setCountdown(formatTime(timer.current))

            if (timer.current === 0) {
                clearInterval(intervalId.current)
                setCountdown(formatTime(timer.current))
                onFinish(timer.current)
            }

        }, 1000)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finished])

    useEffect(() => {
        setCountdown(formatTime(time))
    }, [start, time])

    useEffect(() => {
        if (finished) {
            clearInterval(intervalId.current)
            onFinish(timer.current)
            timer.current = time
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finished])


    useEffect(() => {

        if (start && !finished) {
            startTimer()
        }

    }, [start, finished, startTimer])

    return (
        <div className={'timer'}>
            <span>{countdown}</span>
        </div>
    )
}

export default Timer