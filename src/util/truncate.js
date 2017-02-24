const truncate = (str, cutoff) => {
    if (str.length > cutoff) {
        while (str[cutoff] !== ' ') { cutoff-- }
        return str.substring(0, cutoff) + '...';
    }
    else {
        return str;
    }
}

export default truncate;
