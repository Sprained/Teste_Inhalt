const coinMask = value => {
    return value
    .replace(/[a-z A-Z]/g,'')
}

const pointMask = value => {
    return value
    .replace(/,/g, '.')
}

export { coinMask, pointMask }