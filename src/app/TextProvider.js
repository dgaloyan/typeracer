class TextProvider {

    httpClient;

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async getText() {
        const text = await this.httpClient.get('https://baconipsum.com/api/?type=meat-and-filler?paras=2');
        return  text.data.join('');
    }
}

export default TextProvider;