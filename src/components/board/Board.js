import React, {useCallback, useEffect, useState} from 'react';
import Timer from '../timer/Timer';
import './styles.scss';
import OutPutText from './Text';
import InputText from './InputText';
import {Loader} from '../../commons/Loader';
import {withAppContainer} from '../../withAppContainer';
import Stats from "./Stats";

const Board = ({appContainer}) => {

    const [textMatchingStrategy, setTextMatchingStrategy] = useState();
    const [loading, setLoading] = useState(false);
    const [isTimerStarted, setTimerStarted] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [text, setText] = useState('');
    const [progress, setProgress] = useState(0);
    const [errorText, setErrorText] = useState('');
    const [inputText, setInputText] = useState('');
    const [stats, setStats] = useState([]);
    const [finishTime, setFinishTime] = useState(null);

    const matchingStrategyFactory = useCallback(appContainer.getMatchingStrategyFactory(), []);
    const timeToComplete = useCallback(appContainer.getTimeToComplete(), []);


    useEffect(() => {
        Promise.resolve().then(async () => {
            const texts = await appContainer.textProvider.getText();
            setText(texts);
            setLoading(false);
            setTextMatchingStrategy(matchingStrategyFactory.create(texts));
        });
    }, [appContainer.textProvider, matchingStrategyFactory]);


    useEffect(() => {
        if (textMatchingStrategy) {
            const matchIndex = textMatchingStrategy.check(inputText);
            setErrorText(inputText.substring(matchIndex, inputText.length));
            setProgress(matchIndex);
        }
    }, [inputText, textMatchingStrategy]);

    useEffect(() => {
        if (finishTime !== null) {
            generateReport();
        }
    }, [finishTime]);

    /* useEffect(() => {

         if (stats.length > 0) {
             const statsProvider = appContainer.getStatsProvider()
             Promise.resolve().then(async () => {
                 const userStats = await statsProvider.save(stats)
                 setStats(prev => [...prev, `You can see your stats by ${userStats.uri} url`])
             })
         }
     }, [stats])
 */

    const reset = async () => {
        setLoading(true);
        const texts = await appContainer.textProvider.getText();
        setText(texts);
        setTextMatchingStrategy(matchingStrategyFactory.create(texts));
        setTimerStarted(false)
        setDisabled(false)
        setProgress(0)
        setErrorText('')
        setInputText('')
        setStats([])
        setFinishTime(null)
        setLoading(false);
    }


    const onInputTextChange = (e) => {

        if (!isTimerStarted) {
            setTimerStarted(true);
        }
        setInputText(e.target.value);
    };


    const generateReport = async () => {
        const analysers = appContainer.getAnalysers();

        const results = [];
        const time = finishTime === 0 ? timeToComplete : finishTime;

        analysers.forEach((analyser) => {
            results.push(analyser.analyse(text, progress, inputText, time));
        });

        setStats(results);
    };


    const onTimerFinish = (time) => {
        setDisabled(true);
        setFinishTime(time);
    };


    return (
        <div className={'board'}>
            Welcome to TypeRacer
            <Stats stats={stats}/>
            {stats.length > 0 && <button onClick={reset}>Play again</button>}
            <Timer time={timeToComplete} start={isTimerStarted} onFinish={onTimerFinish}/>
            <Loader loading={loading}>
                <div className={errorText ? 'textError' : ''}>{errorText}</div>
                <div className={'texts'}>
                    <OutPutText text={text} progress={progress}/>
                    <InputText text={inputText} onChange={onInputTextChange} disabled={disabled}/>
                </div>


            </Loader>
        </div>
    );
};

export default withAppContainer(Board);