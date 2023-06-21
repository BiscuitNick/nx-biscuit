export const getRemainingTens = (deck: number[]) => {
  //   const deckSize = deck.length;
  const remainingTens = deck.filter((raw) => raw % 13 > 8).length;

  return remainingTens;
};

// export const getBustCards = (deck: number[], hand: number[]) => {};
