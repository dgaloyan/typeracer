import Result from './Result'

class StatsRepository {

    httpClient
    userRepository

    constructor(httpClient, userRepository) {
        this.httpClient     = httpClient
        this.userRepository = userRepository
    }

    async save(stats) {

        const jsonData = await this.httpClient.get('https://api.myjson.com/bins/sk100')

        const currentUser = jsonData.data.find(user => user.username === this.userRepository.get().username)

        if (!currentUser.stats) {
            currentUser.stats = []
        }
        currentUser.stats.push([...stats, new Date()])

        const savedStats = await this.httpClient.put('https://api.myjson.com/bins/sk100', jsonData.data)

        return new Result(savedStats.data, null)
    }

    async get() {
        const jsonData = await this.httpClient.get('https://api.myjson.com/bins/sk100')
        return new Result(jsonData.data, null)
    }
}

export default StatsRepository