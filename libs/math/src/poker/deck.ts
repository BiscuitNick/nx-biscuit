export const standardSuits = ['c', 'd', 'h', 's'];
export const standardRanks = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
];

export const standardSuitChars = ['♣', '♦', '♥', '♠'];
export const standardSuitColors = ['#000000', '#ff0000', '#ff0000', '#000000'];

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

export const getRawsFromStr = (handString: string) => {
  const raws = [];
  for (let i = 0; i < handString.length / 2; i++) {
    const [r, s] = handString.slice(i * 2, i * 2 + 2);

    const rank = standardRanks.indexOf(r);
    const suit = standardSuits.indexOf(s);

    if (rank > -1 && suit > -1) {
      const raw = rank + suit * 13;
      raws.push(raw);
    }
  }

  return raws;
};

export const getHandStringFromRaws = (raws: number[]) => {
  console.log(142, raws);

  let handString = '';
  raws.forEach((raw) => {
    const rank = raw % 13;
    const suit = Math.floor(raw / 13);
    handString += standardRanks[rank] + standardSuits[suit];
  });
  return handString;
};

export const getHoldsDiscardString = (
  holdCards: number[],
  discards: number[]
) => {
  const holdsXdiscards =
    getHandStringFromRaws(holdCards) + 'x' + getHandStringFromRaws(discards);

  return holdsXdiscards;
};
