class StatsRepository {

    httpClient

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async save(stats) {
        const savedStats = await this.httpClient.post('https://api.myjson.com/bins', stats)

        return savedStats.data
    }
}

export default StatsRepository