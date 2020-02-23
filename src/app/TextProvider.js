class TextProvider {

    httpClient;
    text;

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async getText() {
        if (this.text) {
            return this.text;
        }
        const text = await this.httpClient.get('https://baconipsum.com/api/?type=meat-and-filler?paras=2');
        this.text = text.data.join('');
        return  this.text;
    }
}

export default TextProvider;