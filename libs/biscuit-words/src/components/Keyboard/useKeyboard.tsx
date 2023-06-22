import { useState, useRef, useEffect, useMemo } from 'react';
import { alphabet } from './constants';
import getChars from './getChars';
import { getWordList } from '../../data/words';
import { getCharMap } from '../../utils/getCharMap';

interface KeyboardProps {
  answer?: string;
  validateLength?: boolean;
  validateWordExists?: boolean;
  allowSpaces?: boolean;
}

const useKeyboard = (props: KeyboardProps) => {
  const {
    answer: initAnswer,
    validateLength = true,
    validateWordExists = true,
    allowSpaces = false,
  } = props;
  const [downChar, setDownChar] = useState<string>('');
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>(initAnswer || 'hello');

  const [possibleWords, setPossibleWords] = useState<string[]>([]);
  // const [filteredWOrds, setFiltered] = useState<string[]>([]);

  const { usedChars, inWordChars, correctChars } = useMemo(
    () => getChars(answer, guesses),
    [answer, guesses]
  );

  const charMap = useMemo(() => getCharMap(answer, guesses), [answer, guesses]);
  // const pendingAnswerRef = useRef<any>();
  const keyboardFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (answer && validateWordExists) {
      const wordList = getWordList(answer.length);
      setPossibleWords(wordList);
      // setFiltered(wordList);
    }
  }, [answer, validateWordExists]);

  const resetGame = () => {
    const randomWord =
      possibleWords[Math.floor(Math.random() * possibleWords.length)];
    setAnswer(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    // setFiltered(possibleWords);
  };

  const handleKeyDown = (e: any) => {
    const { key } = e;
    setDownChar(key);
  };

  const handleKeyUp = (e: any) => {
    const { key } = e;
    handleKeyInput(key);
    setDownChar('');
  };

  // validateWord => If true, check if the word is in the wordList
  const handleKeyInput = (key: string) => {
    const validCharacters = alphabet + (allowSpaces ? ' ' : '');
    const lowerCasedKey = key.toLowerCase();
    if (key.length === 1 && validCharacters.includes(lowerCasedKey)) {
      //TODO add validation for length
      //TODO prevent double spaces
      const tempGuess = currentGuess + lowerCasedKey;
      setCurrentGuess(tempGuess);
    } else if (key === 'Spacebar' && allowSpaces) {
      const tempGuess = currentGuess + ' ';
      setCurrentGuess(tempGuess);
    } else if (key === 'Backspace') {
      const tempGuess = currentGuess.slice(0, -1);
      setCurrentGuess(tempGuess);
    } else if (key === 'Enter' && currentGuess.length) {
      if (validateLength && currentGuess.length !== answer.length) {
        // console.log(71, 'Invalid length', currentGuess.length, answer.length);
        return;
      } else if (validateWordExists) {
        const validWord = possibleWords.includes(currentGuess);
        if (validWord) {
          setGuesses([...guesses, currentGuess]);
          setCurrentGuess('');
        } else {
          // console.log(80, 'invalid word', currentGuess);
          // Toasts
        }
      } else if (validateLength && currentGuess.length === answer.length) {
        console.log(84, 'validLength', currentGuess);
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess('');
      } else {
        console.log(89, 'no validating', currentGuess);
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess('');
      }
    } else {
      // console.log('Ignoring key press', key, currentGuess)
    }
  };

  const resetKeyboardFocus = () => {
    keyboardFocusRef.current?.focus();
  };

  useEffect(() => {
    resetKeyboardFocus();
  }, []);

  return {
    charMap,
    resetGame,
    downChar,
    setDownChar,
    currentGuess,
    setCurrentGuess,
    guesses,
    setGuesses,
    answer,
    setAnswer,
    usedChars,
    inWordChars,
    correctChars,
    handleKeyInput,
    handleKeyDown,
    handleKeyUp,
    resetKeyboardFocus,
    // pendingAnswerRef,
    keyboardFocusRef,
    validateWordExists,
    validateLength,
    allowSpaces,
    possibleWords,
    setPossibleWords,
  };
};

export default useKeyboard;
