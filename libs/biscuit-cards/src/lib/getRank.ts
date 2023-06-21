const omegaValues: any = {
  1: 0,
  2: -1,
  3: -1,
  4: -2,
  5: -2,
  6: -2,
  7: -1,
  8: 0,
  9: 1,
  10: 2,
};

export const getBlackJackRanks = (hand: number[]) => {
  const ranks = hand.map((raw) => {
    const rank = raw % 13;
    if (rank === 0) {
      return 1;
    } else if (rank > 8) {
      return 10;
    } else {
      return rank + 1;
    }
  });
  return ranks;
};

export const getBlackJackHandTotal = (hand: number[]) => {
  const ranks = getBlackJackRanks(hand);
  const total = ranks.reduce((acc, rank) => acc + rank, 0);

  return total < 12 && ranks.includes(1) ? total + 10 : total;
};

export const getOmegaCount = (deck: number[]) => {
  const ranks = getBlackJackRanks(deck);
  const count = ranks.reduce((acc, rank) => acc + omegaValues[rank], 0);

  return count;
};
