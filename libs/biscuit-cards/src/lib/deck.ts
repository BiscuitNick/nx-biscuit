export const getDeck = (decks: number) => {
  // return [0, 1, 2, 3, 4, 5, 6];
  return [...Array(52 * decks).keys()].map((i) => i % 52); // BUG ==> TYPESCRIPT BUILD ISSUE
  // const deck = [];

  // for (let i = 0; i < decks * 52; i++) {
  //   deck.push(i);
  // }

  // return deck;
};

export const shuffledDeck = (decks: number) => {
  const deck = getDeck(decks);
  return deck.sort(() => Math.random() - 0.5);
};
