class PercentageAnalyser {
    analyse(text, progress, inputText, finishTime) {
        const completePercentage = (progress / text.length * 100).toFixed(1) + '%';
        return "The completeness's percentage is  " + completePercentage
    }
}

export default PercentageAnalyser;