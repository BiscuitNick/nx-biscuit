// import Set from 'core-js/es6/set';
// const lowercaseChars = ' abcdefghijklmnopqrstuvwxyz';

// const initialCharCounts = () => {
//     const charMap = {};
//     lowercaseChars.split('').map((char) => {
//         charMap[char] = 0;
//     });
//     return charMap;
// }

// const initialCharIndexes = () => {
//     const charMap = {};
//     lowercaseChars.split('').map((char) => {
//         charMap[char] = [];
//     });
//     return charMap;
// }

// const charCounts = (word) => {
//     const chars = initialCharCounts();
//     word.split('').map(char => {
//         // const count = chars[char] ? chars[char] + 1 : 1;
//         chars[char] = chars[char]+1;
//     })
//     return chars;
// }

interface CharIndexes {
  [key: string]: number[];
}

const charIndexes = (word: string) => {
  const chars: CharIndexes = {}; //initialCharIndexes();
  word.split('').forEach((char, index) => {
    if (!chars[char]) {
      chars[char] = [index];
    } else {
      chars[char].push(index);
    }
  });

  console.log(43, charIndexes);

  return chars;
};

const getCharMap = (answer: string, guesses: string[]) => {
  const answerIndexes = charIndexes(answer);

  const matchedChars = new Array(answer.length).fill('-');
  const inWordWrongIndexes: any = {}; //initialCharIndexes();
  const missedChars: string[] = [];

  const matches = guesses.map((guess) => {
    let matchStr = '';
    let inWordWrongIndexStr = '';
    let missStr = '';

    guess.split('').map((char, index) => {
      if (answerIndexes[char]) {
        if (answerIndexes[char].includes(index)) {
          matchedChars[index] = char;
          matchStr += char;
          inWordWrongIndexStr += '-';
          missStr += '-';
        } else {
          const charWrongIndexes = [
            inWordWrongIndexes[char] ? inWordWrongIndexes[char] : [],
          ];
          charWrongIndexes.push(index);
          inWordWrongIndexes[char] = [...charWrongIndexes];

          matchStr += '-';
          inWordWrongIndexStr += char;
          missStr += '-';
        }
      } else {
        missedChars.push(char);
        matchStr += '-';
        inWordWrongIndexStr += '-';
        missStr += char;
      }
    });

    return { match: matchStr, inWord: inWordWrongIndexStr, miss: missStr };
  });

  const matchStr = matchedChars.join('');
  const missStr = [...missedChars].join('');
  const inWordStr = Object.keys(inWordWrongIndexes).join('');

  // return {inWordWrongIndexes, inWordCharMap};
  return {
    matchStr,
    inWordStr,
    missStr,
    inWordWrongIndexes,
    mappedGuesses: matches,
  };
};

// console.log(getCharMap('hello', ['belch', 'lllll', 'chill', 'homes']));

export { getCharMap };
