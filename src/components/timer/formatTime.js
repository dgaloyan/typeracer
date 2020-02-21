export const formatTime = (timeStamp) => {
    const hours = Math.floor(timeStamp / 60 / 60);
    const minutes = Math.floor(timeStamp / 60) - (hours * 60);
    const seconds = timeStamp % 60;

    return ('0' + hours).substr(-2) + ':' + ('0' + minutes).substr(-2) + ':' + ('0' + seconds).substr(-2);
};
