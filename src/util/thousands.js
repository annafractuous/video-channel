const thousands = (num) => {
    return num > 999 ? (num / 1000).toFixed() + 'K' : num;
}

export default thousands;
