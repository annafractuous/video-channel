let doubleDigitSeconds = (seconds) => {
    return seconds > 9 ? seconds : '0' + seconds;
}

const getDuration = (length) => {
    let minutes = Math.floor(length / 60);
    let seconds = length % 60;
    return minutes + ':' + doubleDigitSeconds(seconds);
}

export default getDuration;
