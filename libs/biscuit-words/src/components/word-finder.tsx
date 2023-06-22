import { useEffect, useState } from 'react';

import '../styles/globals.css';

interface WordFinderProps {
  guesses: string[];
  currentGuess: string;
  matchStrings: string[];
  inWordStrings: string[];
  missStrings: string[];
  wordLength: number;
  handleClick: (letter: string, col: number, row: number) => void;
}

export const WordFinder = (props: WordFinderProps) => {
  const isDarkMode = true; // useRecoilValue(isDarkModeAtom);

  const {
    guesses,
    matchStrings,
    inWordStrings,
    missStrings,
    currentGuess,
    wordLength,
    handleClick,
  } = props;

  const [cellSize, setCellSize] = useState(62);

  useEffect(() => {
    const maxCellSize = Math.floor(
      (window.innerWidth - (wordLength + 1) * 5) / wordLength
    );

    if (maxCellSize < 62) {
      setCellSize(maxCellSize);
    }
  }, []);

  const CharCells = guesses.map((guess, row) => {
    const match = matchStrings[row];
    const inWord = inWordStrings[row];
    const miss = missStrings[row];

    if (matchStrings.length !== guesses.length) return null;

    return guess.split('').map((letter, col) => {
      const isCorrect = letter === match[col];
      const isInWord = letter === inWord[col];
      const isMiss = letter === miss[col];

      return (
        <div
          onClick={() => handleClick(letter, col, row)}
          // id={keyid}
          key={col}
          className="xordle-cell"
          style={{
            width: cellSize,
            height: cellSize,
            borderWidth: 2, //applyValidation ? 0 : 2,
            background: isCorrect
              ? '#538d4e'
              : isInWord
              ? '#b59f3b'
              : isMiss
              ? '#3a3a3c'
              : isDarkMode
              ? '#000000'
              : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
          }}
        >
          <span style={{ margin: 'auto' }}>{letter.toUpperCase()}</span>
        </div>
      );
    });
  });

  const PendingCells = () => {
    const cells = [];
    for (let i = 0; i < wordLength; i++) {
      const char = currentGuess.length > i ? currentGuess[i] : '';
      cells.push(
        <div
          key={i}
          className="xordle-cell"
          style={{
            width: cellSize,
            height: cellSize,
            borderWidth: 2,
            background: isDarkMode ? '#000000' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
          }}
        >
          <span style={{ margin: 'auto' }}>{char.toUpperCase()}</span>
        </div>
      );
    }
    return cells;
  };

  return (
    <div
      className="xordle-grid"
      style={{
        gridTemplateColumns: 'auto '.repeat(wordLength),
        gridAutoRows: cellSize,
        margin: 'auto',
      }}
    >
      {CharCells}
      {PendingCells()}
    </div>
  );
};
