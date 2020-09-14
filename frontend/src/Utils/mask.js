const coinMask = value => {
    return value
    .replace(/[a-z A-Z]/g,'')
}

const pointMask = value => {
    return value
    .replace(/,/g, '.')
}

const phoneMask = value => {
    return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d)(\d{4})$/,"$1-$2")  //Coloca hífen entre o quarto e o quinto dígito
}

const cleanMask = value => {
    return value
    .replace(/([^0-9a-zA-Z])/g, '') //Substitui qualquer caracter que não seja numero ou letra por nada
}

const numMask = value => {
    return value
    .replace(/\D/g, '')//substitui qualquer caracter que nao seja numero por nada
}

export { coinMask, pointMask, phoneMask, cleanMask, numMask }