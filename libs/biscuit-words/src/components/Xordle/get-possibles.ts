const getPossibles = (
  wordList: string[],
  matchStrings: string[],
  inWordStrings: string[],
  missStrings: string[]
) => {
  if (matchStrings.length === 0) return wordList;

  const matchChars = matchStrings
    .map((s) => s.split('').filter((c) => c !== '-'))
    .flat();
  const inWordChars = inWordStrings
    .map((s) => s.split('').filter((c) => c !== '-'))
    .flat();
  const missChars = missStrings
    .map((s) => s.split('').filter((c) => c !== '-'))
    .flat()
    .filter(
      (char) => !inWordChars.includes(char) && !matchChars.includes(char)
    );

  const filteredWords = wordList.filter((word) => {
    const chars = word.split('');
    const hasWrongChars = chars.some((char: string) =>
      missChars.includes(char)
    );
    if (hasWrongChars) return false;
    const hasCorrectChars = [...matchChars, ...inWordChars].every(
      (char: string) => chars.includes(char)
    );
    if (!hasCorrectChars) return false;

    const hasWrongIndexes = missStrings.some((word) => {
      const misschars = word.split('');
      return misschars.some((char: string, i: number) => char === chars[i]);
    });
    if (hasWrongIndexes) return false;

    const hasCorrectIndexes = matchStrings.every((word) => {
      const matchChars = word.split('');
      return matchChars.every(
        (char: string, i: number) => char === '-' || char === chars[i]
      );
    });
    return hasCorrectIndexes;
  });

  return filteredWords;
};

export default getPossibles;
