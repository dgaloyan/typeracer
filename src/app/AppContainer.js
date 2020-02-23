class AppContainer {
    textProvider;
    matchingStrategyFactory;
    analysers;
    statsProvider
    timeToComplete;

    constructor(textProvider, matchingStrategyFactory, analysers, statsProvider, timeToComplete) {
        this.textProvider = textProvider;
        this.matchingStrategyFactory = matchingStrategyFactory;
        this.analysers = analysers;
        this.statsProvider = statsProvider;
        this.timeToComplete = timeToComplete;
    }

    getTextProvider() {
        return this.textProvider;
    }

    getMatchingStrategyFactory() {
        return this.matchingStrategyFactory;
    }

    getAnalysers() {
        return this.analysers;
    }

    getStatsProvider(){
        return this.statsProvider
    }

    getTimeToComplete() {
        return this.timeToComplete;
    }
}

export default AppContainer;