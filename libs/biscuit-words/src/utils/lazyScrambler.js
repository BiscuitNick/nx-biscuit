// A very lazy cipher that scrambles a string. 
// Allows passing custom parameter where we don't want the user to easily read the value

// const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// const lowercaseChars = ' abcdefghijklmnopqrstuvwxyz';

const charToNum = {
    ' ': 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
    k: 10,
    l: 11,
    m: 12,
    n: 13,
    o: 14,
    p: 15,
    q: 16,
    r: 17,
    s: 18,
    t: 19,
    u: 20,
    v: 21,
    w: 22,
    x: 23,
    y: 24,
    z: 25,
    a: 26,
}

const charToRandomChar = {
    a: '0',
    b: '1',
    c: '2',
    d: '3',
    e: '4',
    f: '5',
    g: '6',
    h: '7',
    i: '8',
    j: '9',
    k: 'a',
    l: 'A',
    m: 'b',
    n: 'B',
    o: 'c',
    p: 'C',
    q: 'd',
    r: 'D',
    s: 'e',
    t: 'E',
    u: 'f',
    v: 'F',
    w: 'g',
    x: 'G',
    y: 'h',
    z: 'H',
    ' ': '-',
}

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
    }

const lazyScrambler = (str) => {
    return str.split('').map(char => charToRandomChar[char.toLowerCase()]).join('')
    }

const unScrambler = (str) => {
    return str.split('').map(char => getKeyByValue(charToRandomChar, char)).join('')
    }

const strToNum = (str) => {
    let num = 0;
    str.split('').map( (char,i) => {
        const xFactor = 27 ** (str.length - i - 1);
        const charNum = charToNum[char.toLowerCase()];
        console.log(i, char, xFactor, charNum, num)
        num += xFactor * charNum;
    })
    return num;
}

const twentyZevenPowers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(num => 27 ** num);
const numToStr = (num) => {
    const strLen = twentyZevenPowers.findIndex(power => power > num);
    let str = '';

    for(let i=0;i<strLen;i++){
        const xFactor = twentyZevenPowers[strLen - i - 1];
        const xMultiple = Math.floor(num / xFactor);
        const char = getKeyByValue(charToNum, xMultiple);
        console.log(xFactor, xMultiple, char, str, num)
        str += char;
        num -= xFactor * xMultiple;

    }
    return str;
}

export { lazyScrambler, unScrambler, strToNum, numToStr }