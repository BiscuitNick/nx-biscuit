const getChars = (answer: string, guesses: string[]) => {
  const usedChars: string[] = [];
  const inWordChars: string[] = [];
  // const correctChars: string[] = [];
  const correctChars: string[] = new Array(answer.length).fill('-');

  guesses.forEach((guess) => {
    const guessChars = guess.split('');
    guessChars.forEach((guessChar, i) => {
      if (answer[i] === guessChar) {
        correctChars.push(guessChar);
      } else if (answer.includes(guessChar)) {
        inWordChars.push(guessChar);
      }
      usedChars.push(guessChar);
    });
  });

  const inWord = inWordChars.filter((char) => !correctChars.includes(char));

  return { usedChars, inWordChars: inWord, correctChars };
};

export default getChars;
