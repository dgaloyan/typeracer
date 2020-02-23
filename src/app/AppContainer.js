class AppContainer {
    textProvider;
    matchingStrategyFactory;
    analysers;
    timeToComplete;

    constructor(textProvider, matchingStrategyFactory, analysers, timeToComplete) {
        this.textProvider = textProvider;
        this.matchingStrategyFactory = matchingStrategyFactory;
        this.analysers = analysers;
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

    getTimeToComplete() {
        return this.timeToComplete;
    }
}

export default AppContainer;