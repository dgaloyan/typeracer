import TextMatchingStrategy from './TextMatchingStrategy';

class MatchingStrategyFactory {
    create(text){
        return new TextMatchingStrategy(text)
    }
}

export default MatchingStrategyFactory