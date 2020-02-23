export const formatTime = (millis) => {
    const seconds = Math.floor( millis / 1000);

    const h = Math.floor(seconds / 60 / 60);
    const m = Math.floor(seconds / 60) - (h * 60);
    const s = seconds % 60;

    return ('0' + h).substr(-2) + ':' + ('0' + m).substr(-2) + ':' + ('0' + s).substr(-2);
};
