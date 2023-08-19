export const standardDeck = [...Array(52).keys()];

interface deckProps {
  hand?: number[];
  discards?: number[];
  deck?: number[];
}

export const getFilteredDeck = ({
  hand = [],
  discards = [],
  deck = standardDeck,
}: deckProps) => deck.filter((x) => !hand.includes(x) && !discards.includes(x));

export const getRankCounts = (cards: number[]) => {
  const rankCounts = new Array(13).fill(0);
  cards.forEach((card) => rankCounts[card % 13]++);
  return rankCounts;
};

export const getStraightRankCounts = (cards: number[]) => {
  const rankCounts = new Array(14).fill(0);
  cards.forEach((card) => {
    rankCounts[card % 13]++;
    if (card % 13 === 0) {
      rankCounts[13]++;
    }
  });
  return rankCounts;
};

export const getRanks = (cards: number[]) => {
  const rankCounts = getRankCounts(cards);
  const kickers: number[] = [];
  const pairs: number[] = [];
  const trips: number[] = [];
  const quads: number[] = [];

  rankCounts.forEach((count, rank) => {
    if (count === 1) {
      kickers.push(rank);
    } else if (count === 2) {
      pairs.push(rank);
    } else if (count === 3) {
      trips.push(rank);
    } else if (count === 4) {
      quads.push(rank);
    }
  });

  return { kickers, pairs, trips, quads };
};

export const getSuitCounts = (cards: number[]) => {
  const suitCounts = [0, 0, 0, 0];
  cards.forEach((card) => {
    suitCounts[Math.floor(card / 13)]++;
  });
  return suitCounts;
};

export const getSuitRankCounts = (cards: number[]) => {
  const suitRankCounts: number[][] = [
    new Array(14).fill(0),
    new Array(14).fill(0),
    new Array(14).fill(0),
    new Array(14).fill(0),
  ];

  cards.forEach((card) => {
    const rank = card % 13;
    const suit = Math.floor(card / 13);
    suitRankCounts[suit][rank]++;
    if (rank === 0) {
      suitRankCounts[suit][13]++;
    }
  });

  return suitRankCounts;
};

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

export const shuffle = (deck: number[]) => {
  return [...deck.sort(() => Math.random() - 0.5)];
};
