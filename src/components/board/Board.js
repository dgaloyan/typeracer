import React, {useCallback, useEffect, useState} from 'react'
import Timer                                     from '../timer/Timer'
import './styles.scss'
import OutPutText                                from './Text'
import InputText                                 from './InputText'
import {Loader}                                  from '../../commons/Loader'
import {withAppContainer}                        from '../../withAppContainer'
import Stats                                     from './Stats'

const Board = ({appContainer}) => {

    const [textMatchingStrategy, setTextMatchingStrategy] = useState()
    const [loading, setLoading]                           = useState(true)
    const [isTimerStarted, setTimerStarted]               = useState(false)
    const [disabled, setDisabled]                         = useState(false)
    const [text, setText]                                 = useState('')
    const [progress, setProgress]                         = useState(0)
    const [errorText, setErrorText]                       = useState('')
    const [inputText, setInputText]                       = useState('')
    const [stats, setStats]                               = useState([])
    const [finishTime, setFinishTime]                     = useState(null)

    const matchingStrategyFactory = useCallback(appContainer.getMatchingStrategyFactory(), [])
    const timeToComplete          = useCallback(appContainer.getTimeToComplete(), [])


    useEffect(() => {
        Promise.resolve().then(async () => {
            const texts = await appContainer.getTextProvider().getText()
            setText(texts)
            setLoading(false)
            setTextMatchingStrategy(matchingStrategyFactory.create(texts))
        })
    }, [appContainer, matchingStrategyFactory])


    useEffect(() => {
        if (textMatchingStrategy) {
            const matchIndex = textMatchingStrategy.check(inputText)

            if(matchIndex !== inputText.length){

                return
            }
            setErrorText(inputText.substring(matchIndex, inputText.length))
            setProgress(matchIndex)
        }
    }, [inputText, textMatchingStrategy])


    const generateReport = async () => {
        const analysers = appContainer.getAnalysers()

        const results = []
        const time    = finishTime === 0 ? timeToComplete : finishTime

        analysers.forEach((analyser) => {
            results.push(analyser.analyse(text, progress, inputText, time))
        })

        await appContainer.getStatsRepository().save(results)

        setStats([...results])
    }

    useEffect(() => {
        if (finishTime !== null) {
            generateReport().then(r => {
            })
        }
    }, [finishTime])


    const reset = async () => {
        setLoading(true)
        const texts = await appContainer.textProvider.getText()
        setText(texts)
        setTextMatchingStrategy(matchingStrategyFactory.create(texts))
        setTimerStarted(false)
        setDisabled(false)
        setProgress(0)
        setErrorText('')
        setInputText('')
        setStats([])
        setFinishTime(null)
        setLoading(false)
    }


    const onInputTextChange = (e) => {

        if (!isTimerStarted) {
            setTimerStarted(true)
        }
        setInputText(e.target.value)
    }


    const onTimerFinish = (time) => {
        setDisabled(true)
        setFinishTime(time)
    }

    const TimerMemo = useCallback(() =>
        <Timer
            time={timeToComplete}
            start={isTimerStarted}
            onFinish={onTimerFinish}/>, [isTimerStarted, timeToComplete])

    return (
        <div className={'board'}>
            Welcome to TypeRacer
            <Stats stats={stats}/>
            {stats.length > 0 && <button onClick={reset}>Play again</button>}
            <TimerMemo/>
            <Loader loading={loading}>
                <div style={{opacity: errorText ? 1 : 0}} className={'textError'}>{errorText}</div>
                <div className={'texts'}>
                    <OutPutText text={text} progress={progress}/>
                    <InputText text={inputText} onChange={onInputTextChange} disabled={disabled}/>
                </div>
            </Loader>
        </div>
    )
}

export default withAppContainer(Board)