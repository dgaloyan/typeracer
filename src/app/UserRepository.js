import Result from './Result'

class UserRepository {

    subscribers = []
    isLoggedIn  = !!localStorage.getItem('user')
    httpClient

    constructor(httpClient) {
        this.httpClient = httpClient
    }

    async login(username) {
        const jsonData = await this.httpClient.get('https://api.myjson.com/bins/sk100')

        if (jsonData.data.find(user => user.username === username)) {
            this.isLoggedIn = true
            localStorage.setItem('user', JSON.stringify({username: username}))
            this.notify('loginChange', this.isLoggedIn)
            return new Result({}, null)
        }

        return new Result(null, `username ${username} is not correct`)
    }

    async register(username) {
        const jsonData = await this.httpClient.get('https://api.myjson.com/bins/sk100')

        if (jsonData.data.find(user => user.username === username)) {
            return new Result(null, `username ${username} already exists`)
        }

        const response = await this.httpClient.put('https://api.myjson.com/bins/sk100', [
            ...jsonData.data,
            {username: username}
        ])

        return new Result(response.data, null)
    }

    logout() {
        localStorage.removeItem('user')
        this.isLoggedIn = false
        this.notify('loginChange', this.isLoggedIn)
    }

    get() {
        return JSON.parse(localStorage.getItem('user'))
    }

    notify(event, data) {
        this.subscribers[event] && this.subscribers[event].forEach(func => {
            func(data)
        })
    }

    subscribe(event, func) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = new Map()
        }

        this.subscribers[event].set(func.toString(), func)

        return () => this.subscribers[event].delete(func.toString())
    }
}

export default UserRepository