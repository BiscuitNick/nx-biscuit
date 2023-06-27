import React, { useEffect, useState } from 'react';

interface XordleProps {
  maxGuesses: number;
  guesses: string[];
  answer: string;
  currentGuess: string;
  resetGame?: () => void;
}

const Xordle = (props: XordleProps) => {
  const { maxGuesses, answer, currentGuess, guesses, resetGame } = props;
  const wordLength = answer.length;

  const [cellSize, setCellSize] = useState(62);

  useEffect(() => {
    const maxCellSize = Math.floor(
      (window.innerWidth - (answer.length + 1) * 5) / answer.length
    );

    if (maxCellSize < 62) {
      setCellSize(maxCellSize);
    }

    // console.log(maxCellSize);
  }, []);

  const isWinner = guesses.includes(answer);

  const xordleRows = [];
  for (let r = 0; r < maxGuesses; r++) {
    const word =
      r < guesses.length
        ? guesses[r]
        : r === guesses.length
        ? currentGuess
        : '';
    const row = [];
    const applyValidation = r < guesses.length;
    for (let i = 0; i < answer.length; i++) {
      const letter = word[i] || '';
      const isCorrect = letter === answer[i];
      const isInWord = answer.includes(letter);
      const isWrong = !isCorrect && !isInWord;
      const keyid = `${r}-${i}`;
      row.push(
        <div
          id={keyid}
          key={keyid}
          className="xordle-cell"
          style={{
            width: cellSize,
            height: cellSize,
            transitionDelay: `${500 * i}ms`,
            borderWidth: applyValidation ? 0 : 2,
            background:
              applyValidation && isCorrect
                ? '#538d4e'
                : applyValidation && isInWord
                ? '#b59f3b'
                : applyValidation && isWrong
                ? '#3a3a3c'
                : '#000000',
            animation:
              applyValidation && word === answer
                ? `shake 1500ms ${answer.length * 500 + i * 200}ms infinite`
                : 'none',
            // animationDelay: `${1500*answer.length}ms`,
          }}
        >
          <span style={{ margin: 'auto' }}>{letter.toUpperCase()}</span>
        </div>
      );
    }
    xordleRows.push(row);
  }

  return (
    <>
      {guesses.length === maxGuesses && (
        <div className="xordle-gameover-modal">New Game</div>
      )}
      <div
        className="xordle-grid"
        style={{
          gridTemplateColumns: 'auto '.repeat(wordLength),
          gridTemplateRows: 'auto '.repeat(maxGuesses),
        }}
      >
        {xordleRows}
      </div>

      {isWinner && (
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            color: 'white',
            display: 'grid',
          }}
        >
          <div
            style={{
              margin: 'auto',
              background: `rgba(0,0,0,.5)`,
              width: '50%',
              maxWidth: 1000,
              maxHeight: 1000,
              display: 'grid',
              padding: 15,
              gridGap: 10,
            }}
          >
            <h3 style={{ margin: 'auto' }}>You Won</h3>
            <button
              style={{
                outline: 'none',
                border: 'none',
                borderRadius: 5,
                margin: 'auto',
                width: 100,
                padding: 10,
                background: '#538d4e',
                color: 'white',
              }}
              onClick={resetGame}
            >
              New Game
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Xordle;
