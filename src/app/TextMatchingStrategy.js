class TextMatchingStrategy {

    text

    constructor(text) {
        this.text  = text
        this.check = this.check.bind(this)
    }

    check(input) {
        if (input.length === 0) return 0

        let matchEndIndex = 0

        while (matchEndIndex < input.length && this.text.charAt(matchEndIndex) === input.charAt(matchEndIndex))
            matchEndIndex++

        return matchEndIndex
    }
}

export default TextMatchingStrategy