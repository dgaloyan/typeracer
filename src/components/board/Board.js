import React, {useCallback, useEffect, useState} from 'react';
import Timer                                     from '../timer/Timer';
import './styles.scss';
import OutPutText                                from './Text';
import InputText                                 from './InputText';
import {Loader}                                  from '../../commons/Loader';
import {withAppContainer}                        from '../../withAppContainer';

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


    const onInputTextChange = (e) => {

        if (!isTimerStarted) {
            setTimerStarted(true);
        }
        setInputText(e.target.value);
    };


    const generateReport = () => {
        const analysers = appContainer.getAnalysers();

        const results = [];

        analysers.forEach((analyser) => {
            results.push(analyser.analyse(text, progress, inputText, finishTime));
        });
        console.log(results);
        setStats(results);
    };


    const onTimerFinish = (time) => {
        setDisabled(true);
        setFinishTime(time);
    };


    return (
        <Loader loading={loading}>
            <div className={'board'}>
                Welcome to TypeRacer
                <Timer time={timeToComplete} start={isTimerStarted} onFinish={onTimerFinish}/>
                <div className={errorText ? 'textError' : ''}>{errorText}</div>
                <div className={'texts'}>
                    <OutPutText text={text} progress={progress}/>
                    <InputText text={inputText} onChange={onInputTextChange} disabled={disabled}/>
                </div>
            </div>
        </Loader>
    );
};

export default withAppContainer(Board);