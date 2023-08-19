import { useState, useEffect } from 'react';

const WordList = ({
  words,
  setCurrentGuess,
}: {
  words: string[];
  setCurrentGuess: any;
}) => {
  const [randomWords, setRandom] = useState<string[]>([]);
  // const [wordsPerPage, setWordsPerPage] = useState<number>(42);
  // TODO make this dynamic
  const wordsPerPage = 42;
  const [page, setPage] = useState<number>(0);
  const wordCount = words.length;
  const pages = Math.ceil(wordCount / wordsPerPage);

  useEffect(() => {
    setRandom(words);
    setPage(0);
  }, [words]);

  const randomize = () => {
    const randos = [...randomWords].sort(() => Math.random() - 0.5);
    setRandom(randos);
  };

  const alphabetize = () => {
    setRandom(words);
  };

  return (
    <div
      style={{
        fontFamily: 'Clear Sans, Helvetica Neue, Arial, sans-serif',
        border: 'white 1px solid',
        margin: 'auto',
        flexWrap: 'wrap',
        color: 'white',
        width: '100%',
        maxWidth: 500,

        height: '100%',
        maxHeight: 500,

        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: '1fr',

        overflow: 'auto',
        justifyContent: 'space-around',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          background: 'black',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={alphabetize}>A-Z</button>

        <div>{wordCount} Possible Words</div>

        <button onClick={randomize}>Randomize</button>
      </div>

      <div
        style={{
          padding: 15,
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'auto',
          flexWrap: 'wrap',
          gridGap: 10,
        }}
      >
        {randomWords
          .slice(page * wordsPerPage, (page + 1) * wordsPerPage)
          .map((x) => (
            <div
              key={x}
              style={{ margin: 'auto' }}
              onClick={() => setCurrentGuess(x)}
            >{`${x.toUpperCase()} `}</div>
          ))}
      </div>

      <div
        style={{
          width: '100%',
          background: 'black',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={() => setPage(page > 0 ? page - 1 : 0)}>Back</button>
        <div>
          Page {page + 1} of {pages}
        </div>
        <button onClick={() => setPage(page + 1 < pages ? page + 1 : page)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default WordList;
