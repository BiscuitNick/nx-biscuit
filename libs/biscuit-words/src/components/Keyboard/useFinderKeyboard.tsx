import { useState, useRef, useEffect } from 'react';
import { alphabet } from './constants';

interface FinderKeyboardProps {
  allowSpaces?: boolean;
  wordLength?: number;
}

export const useFinderKeyboard = (props: FinderKeyboardProps) => {
  const { allowSpaces = false, wordLength = 5 } = props;
  const [downChar, setDownChar] = useState<string>('');
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const keyboardFocusRef = useRef<HTMLInputElement>();

  const handleKeyDown = (e: { key: string }) => {
    const { key } = e;
    setDownChar(key);
  };

  const handleKeyUp = (e: any) => {
    const { key } = e;
    handleKeyInput(key);
    setDownChar('');
  };

  const handleKeyInput = (key: string) => {
    const validCharacters = alphabet + (allowSpaces ? ' ' : '');
    const lowerCasedKey = key.toLowerCase();
    if (
      key.length === 1 &&
      validCharacters.includes(lowerCasedKey) &&
      currentGuess.length < wordLength
    ) {
      const tempGuess = currentGuess + lowerCasedKey;
      setCurrentGuess(tempGuess);
    } else if (key === 'Spacebar' && allowSpaces) {
      const tempGuess = currentGuess + ' ';
      setCurrentGuess(tempGuess);
    } else if (key === 'Backspace') {
      const tempGuess = currentGuess.slice(0, -1);
      setCurrentGuess(tempGuess);
    } else if (key === 'Enter' && currentGuess.length) {
      if (currentGuess.length !== wordLength) {
        console.log(
          'Invalid length',
          currentGuess.length,
          wordLength,
          currentGuess
        );
        return;
      } else {
        console.log(
          'Valid length, submiting guess',
          currentGuess.length,
          wordLength,
          currentGuess
        );
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess('');
      }
    } else {
      console.log('Ignoring key press', key, currentGuess);
    }
  };

  const resetKeyboardFocus = () => {
    keyboardFocusRef.current?.focus();
  };

  useEffect(() => {
    resetKeyboardFocus();
  }, []);

  return {
    currentGuess,
    downChar,
    guesses,

    handleKeyInput,
    handleKeyDown,
    handleKeyUp,

    keyboardFocusRef,
    allowSpaces,

    setCurrentGuess,
  };
};
