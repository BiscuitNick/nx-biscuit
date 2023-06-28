import React, { useEffect, useMemo, useState, useRef } from 'react';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import Tooltip from '@mui/material/Tooltip';
import { WordFinder } from '../word-finder';
import getPossibles from '../Xordle/get-possibles';
import WordList from '../word-list';
import Keyboard from '../Keyboard';
import { useFinderKeyboard } from '../Keyboard/useFinderKeyboard';
import { letters5 } from '../../data/words';

interface FinderComponent {
  wordLength: number;
}

export const Finder: React.FC<FinderComponent> = ({
  wordLength = 5,
}: FinderComponent) => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [showKeyboard, setShowKeyboard] = useState(true);

  const refInputChars = useRef<HTMLDivElement>(null);
  const refWordList = useRef<HTMLDivElement>(null);

  const goTo = (ref: string) => {
    const refs: any = { refInputChars, refWordList };
    const target = refs[ref];

    if (!target) return;
    target.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setWordList(letters5);
  }, [wordLength]);

  const [guessChars, setGeuessChars] = useState<any>([]);

  const [matchStrings, setMatchStrings] = useState<string[]>([]);
  const [inWordStrings, setInWordStrings] = useState<string[]>([]);
  const [missStrings, setMissStrings] = useState<string[]>([]);

  const {
    currentGuess,
    downChar,
    guesses,

    handleKeyInput,
    handleKeyDown,
    handleKeyUp,

    // keyboardFocusRef,
    allowSpaces,

    setCurrentGuess,
  } = useFinderKeyboard({ wordLength });

  useEffect(() => {
    if (guesses.length > 0) {
      const lastGuess = guesses[guesses.length - 1];
      const charMap = lastGuess.split('').map((c) => ({ [c]: 0 }));
      setGeuessChars([...guessChars, charMap]);
    }
  }, [guesses]);

  useEffect(() => {
    const unknowns: string[] = [];
    const matches: string[] = [];
    const inWords: string[] = [];
    const misses: string[] = [];

    guessChars.forEach((charMap: { [x: string]: any }) => {
      let unknown = '';
      let match = '';
      let inWord = '';
      let miss = '';

      charMap.forEach((charItem: { [x: string]: any }) => {
        const char = Object.keys(charItem)[0];
        const count = charItem[char] % 4;
        if (count === 0) {
          unknown += char;
          match += '-';
          inWord += '-';
          miss += '-';
        }
        if (count === 1) {
          unknown += '-';
          match += '-';
          inWord += '-';
          miss += char;
        }
        if (count === 2) {
          unknown += '-';
          match += '-';
          inWord += char;
          miss += char;
        }
        if (count === 3) {
          unknown += '-';
          match += char;
          inWord += '-';
          miss += '-';
        }
      });
      unknowns.push(unknown);
      matches.push(match);
      inWords.push(inWord);
      misses.push(miss);
    });

    setMatchStrings(matches);
    setInWordStrings(inWords);
    setMissStrings(misses);
  }, [guessChars]);

  const possibleWords = useMemo(
    () => getPossibles(wordList, matchStrings, inWordStrings, missStrings),
    [wordList, matchStrings, inWordStrings, missStrings]
  );

  const handleClick = (letter: string, column: number, row: number) => {
    if (letter === '' || letter === ' ' || !letter) {
      console.log('invalid letter', letter);
      return;
    }

    const newGuessChars = [...guessChars];
    const currentCount = newGuessChars[row][column][letter] || 0;
    newGuessChars[row][column][letter] = currentCount + 1;

    setGeuessChars(newGuessChars);
  };

  return (
    <div
      className="fullscreen-wrapper"
      // ref={keyboardFocusRef}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      style={{
        // minHeight: "100vh",
        maxWidth: '100vw',
        display: 'grid',
        gridAutoFlow: 'column',
        overflow: 'auto',
      }}
    >
      <div
        ref={refInputChars}
        style={{
          position: 'relative',

          display: 'grid',
          margin: 'auto',
          width: '100vw',
          height: '100%',
          gridTemplateRows: '1fr auto auto',
          gridGap: '1em',
          paddingBottom: '2rem',
        }}
      >
        <Tooltip
          title={showKeyboard ? 'Hide Keyboard' : 'Show Keyboard'}
          placement="top"
          arrow
        >
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
            }}
          >
            {showKeyboard ? (
              <KeyboardHideIcon
                onClick={() => setShowKeyboard(!showKeyboard)}
                fontSize="large"
              />
            ) : (
              <KeyboardIcon
                onClick={() => setShowKeyboard(!showKeyboard)}
                fontSize="large"
              />
            )}
          </div>
        </Tooltip>

        <WordFinder
          currentGuess={currentGuess}
          guesses={guesses}
          matchStrings={matchStrings}
          inWordStrings={inWordStrings}
          missStrings={missStrings}
          handleClick={handleClick}
          wordLength={wordLength}
        />
        <button
          onClick={() => goTo('refWordList')}
          style={{
            background: 'limegreen',
            margin: 'auto',
            padding: 10,
            borderRadius: 10,
            // position: "absolute",
            // top: 0,
            // right: 0,
          }}
        >
          {possibleWords.length} Possible Words
        </button>

        {showKeyboard && (
          <Keyboard
            handleKeyPress={handleKeyInput}
            usedChars={missStrings.map((word) => word.split('')).flat()}
            inWordChars={inWordStrings.map((word) => word.split('')).flat()}
            correctChars={matchStrings.map((word) => word.split('')).flat()}
            downChar={downChar}
            mode={allowSpaces ? 'QwertyWithSpacebar' : 'QwertyNoSpacebar'}
          />
        )}
      </div>

      <div
        ref={refWordList}
        style={{
          position: 'relative',
          display: 'grid',
          margin: 'auto',
          width: '100vw',
          height: '100%',
          gridTemplateRows: 'auto auto',
          padding: 20,
        }}
      >
        <WordList words={possibleWords} setCurrentGuess={setCurrentGuess} />
        <button
          onClick={() => goTo('refInputChars')}
          style={{
            background: 'limegreen',
            margin: 'auto',
            padding: 10,
            borderRadius: 10,
            // position: "absolute",
            // top: 0,
            // right: 0,
          }}
        >
          Back To Guesses
        </button>
      </div>
    </div>
  );
};
