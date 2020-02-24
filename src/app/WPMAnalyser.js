class WPMAnalyser {
    analyse(text, progress, inputText, finishTime) {
        const wpm = (progress / 5 / (finishTime / 1000 / 60)).toFixed(1)
        return `Your WPM is ${wpm}`
    }
}

export default WPMAnalyser