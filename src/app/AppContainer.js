class AppContainer {
    textProvider
    matchingStrategyFactory
    analysers
    statsRepository
    userRepository
    timeToComplete

    constructor(textProvider, matchingStrategyFactory, analysers, statsRepository, userRepository, timeToComplete) {
        this.textProvider            = textProvider
        this.matchingStrategyFactory = matchingStrategyFactory
        this.analysers               = analysers
        this.statsRepository         = statsRepository
        this.userRepository          = userRepository
        this.timeToComplete          = timeToComplete
    }

    getTextProvider() {
        return this.textProvider
    }

    getMatchingStrategyFactory() {
        return this.matchingStrategyFactory
    }

    getAnalysers() {
        return this.analysers
    }

    getStatsRepository() {
        return this.statsRepository
    }

    getUserRepository() {
        return this.userRepository
    }

    getTimeToComplete() {
        return this.timeToComplete
    }
}

export default AppContainer