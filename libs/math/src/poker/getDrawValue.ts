import { standardDeck } from './constants';
import { getTotalCombinations } from './getTotalCombinations';

interface getDrawsProps {
  hand?: number[];
  discards?: number[];
  deck?: number[];
}

const getFilteredDeck = ({
  hand = [],
  discards = [],
  deck = standardDeck,
}: getDrawsProps) =>
  deck.filter((x) => !hand.includes(x) && !discards.includes(x));

// const getSuitCounts = (cards: number[]) => {};
const getRankCounts = (cards: number[]) => {
  const rankCounts = new Array(14).fill(0);
  cards.forEach((card) => rankCounts[card % 13]++);
  return rankCounts;
};
// const getStraightCounts = (cards: number[]) => {};

// export const getRoyalFlushDraws = (props: getDrawsProps) => {
//   const { hand = [], discards = [], deck = standardDeck } = props;
//   const filteredDeck = deck.filter(
//     (x) => !hand.includes(x) && !discards.includes(x)
//   );
//   const totalHands = getTotalCombinations(filteredDeck.length, 5 - hand.length);

//   return filteredDeck;
// };

export const getStraightFlushDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const suitRankCounts: number[][] = [
    new Array(14).fill(0),
    new Array(14).fill(0),
    new Array(14).fill(0),
    new Array(14).fill(0),
  ];

  const filteredDeck = deck.filter(
    (x) => !hand.includes(x) && !discards.includes(x)
  );
  filteredDeck.forEach((card) => {
    const rank = card % 13;
    const suit = Math.floor(card / 13);
    suitRankCounts[suit][rank]++;
    if (rank === 0) {
      suitRankCounts[suit][13]++;
    }
  });

  const totalHands = getTotalCombinations(filteredDeck.length, 5 - hand.length);

  let potentialStraightFlushes = 0;
  let potentialRoyalFlushes = 0;

  if (hand.length === 0) {
    suitRankCounts.forEach((suitRanks, i) => {
      for (let i = 0; i < 10; i++) {
        const strSegment = suitRanks.slice(i, i + 5);
        const product = strSegment.reduce((a, b) => a * b);
        if (i < 9) {
          potentialStraightFlushes += product;
        } else {
          potentialRoyalFlushes += product;
        }
      }
    });

    // const straightOdds = potentialStraights / totalHands;

    return { totalHands, potentialStraightFlushes, potentialRoyalFlushes };
  } else {
    const handSuitRanks = [
      new Array(14).fill(0),
      new Array(14).fill(0),
      new Array(14).fill(0),
      new Array(14).fill(0),
    ];

    const handSuitCounts = [0, 0, 0, 0];

    hand.forEach((card) => {
      const rank = card % 13;
      const suit = Math.floor(card / 13);
      handSuitCounts[suit]++;
      handSuitRanks[suit][card % 13]++;
      if (rank === 0) {
        handSuitRanks[suit][13]++;
      }
    });

    if (Math.max(...handSuitCounts) < hand.length) {
      return { totalHands, potentialStraightFlushes, potentialRoyalFlushes };
    } else {
      // let potentialStraights = 0;

      handSuitRanks.forEach((suitRanks, suit) => {
        for (let i = 0; i < 10; i++) {
          const strSegment = suitRanks.slice(i, i + 5);
          const sum = strSegment.reduce((a, b) => a + b);

          if (sum === 5) {
            if (i < 9) {
              potentialStraightFlushes += 1;
            } else {
              potentialRoyalFlushes += 1;
            }
          } else if (sum === hand.length) {
            const outs: number[] = [];
            strSegment.map((count, index) => {
              if (count === 0) {
                outs.push(suitRankCounts[suit][i + index]);
              }
            });
            const product = outs.reduce((a, b) => a * b);
            if (i < 9) {
              potentialStraightFlushes += product;
            } else {
              potentialRoyalFlushes += product;
            }
          }
        }
      });

      // const straightOdds = potentialStraights / totalHands;
      return {
        totalHands,
        potentialStraightFlushes,
        potentialRoyalFlushes,
      };

      // return { totalHands, potentialStraights, straightOdds };
    }
  }
};

export const getFlushDraws = (props: getDrawsProps) => {
  // TODO: Check for Straight & Royal Flushes and Remove from these totals.
  const { hand = [], discards = [], deck = standardDeck } = props;
  const filteredDeck = deck.filter(
    (x) => !hand.includes(x) && !discards.includes(x)
  );

  const totalHands = getTotalCombinations(filteredDeck.length, 5 - hand.length);
  const { potentialStraightFlushes, potentialRoyalFlushes } =
    getStraightFlushDraws({ hand, discards, deck });
  const straightFlushes = potentialStraightFlushes + potentialRoyalFlushes;
  let potentialFlushes = -straightFlushes;

  if (hand.length === 0) {
    const suitCounts = [0, 0, 0, 0];
    filteredDeck.forEach((card) => {
      suitCounts[Math.floor(card / 13)]++;
    });

    suitCounts.forEach((count) => {
      potentialFlushes += getTotalCombinations(count, 5);
    });
  } else {
    const flushable = hand.every(
      (num) => Math.floor(num / 13) === Math.floor(hand[0] / 13)
    );
    if (flushable) {
      const flushOuts = filteredDeck.filter(
        (x) => Math.floor(x / 13) === Math.floor(hand[0] / 13)
      ).length;
      potentialFlushes += getTotalCombinations(flushOuts, 5 - hand.length);
    }
  }
  return { totalHands, potentialFlushes };
};

export const getStraightDraws = (props: getDrawsProps) => {
  // TODO: Check for Straight & Royal Flushes and Remove from these totals.
  const { hand = [], discards = [], deck = standardDeck } = props;
  const rankCounts = new Array(14).fill(0);

  const filteredDeck = deck.filter(
    (x) => !hand.includes(x) && !discards.includes(x)
  );
  filteredDeck.forEach((card) => {
    const rank = card % 13;
    rankCounts[rank]++;
    if (rank === 0) {
      rankCounts[13]++;
    }
  });

  const totalHands = getTotalCombinations(filteredDeck.length, 5 - hand.length);
  const { potentialStraightFlushes, potentialRoyalFlushes } =
    getStraightFlushDraws({ hand, discards, deck });
  const straightFlushes = potentialStraightFlushes + potentialRoyalFlushes;
  let potentialStraights = -straightFlushes;

  if (hand.length === 0) {
    // let potentialStraights = 0;

    for (let i = 0; i < 10; i++) {
      const strSegment = rankCounts.slice(i, i + 5);
      const product = strSegment.reduce((a, b) => a * b);
      potentialStraights += product;
    }

    const straightOdds = potentialStraights / totalHands;

    return { totalHands, potentialStraights, straightOdds };
  } else {
    const handRanks = new Array(14).fill(0);

    hand.forEach((card) => {
      const rank = card % 13;
      handRanks[card % 13]++;
      if (rank === 0) {
        handRanks[13]++;
      }
    });

    const pairOrBetter = handRanks.some((count) => count >= 2);

    if (pairOrBetter) {
      // const potentialStraights = 0;
      const straightOdds = 0;
      return { totalHands, potentialStraights, straightOdds };
    } else {
      // let potentialStraights = 0;

      for (let i = 0; i < 10; i++) {
        const strSegment = handRanks.slice(i, i + 5);
        const sum = strSegment.reduce((a, b) => a + b);

        if (sum === 5) {
          potentialStraights += 1;
        } else if (sum === hand.length) {
          const outs: number[] = [];
          strSegment.map((count, index) => {
            if (count === 0) {
              outs.push(rankCounts[i + index]);
            }
          });
          const product = outs.reduce((a, b) => a * b);
          potentialStraights += product;
        }
      }

      const straightOdds = potentialStraights / totalHands;
      return { totalHands, potentialStraights, straightOdds };
    }
  }
};

export const getQuadDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const deckRankCounts = new Array(13).fill(0);
  const handRankCounts = new Array(13).fill(0);
  const handRanks = hand.map((card) => card % 13);
  const filteredDeck = deck.filter(
    (x) => !hand.includes(x) && !discards.includes(x)
  );
  filteredDeck.forEach((card) => {
    const rank = card % 13;
    deckRankCounts[rank]++;
  });
  hand.forEach((card) => {
    const rank = card % 13;
    handRankCounts[rank]++;
  });
  const totalHands = getTotalCombinations(filteredDeck.length, 5 - hand.length);
  const remainingQuads = deckRankCounts.filter((count) => count === 4).length;
  const isQuads = Math.max(...handRankCounts) === 4;
  const isTrips = Math.max(...handRankCounts) === 3;
  const isPaired = Math.max(...handRankCounts) === 2;
  //   const isUnmatched = Math.max(...handRankCounts) < 2;

  if (hand.length === 0) {
    const potentialQuads = remainingQuads * (filteredDeck.length - 4);
    const quadOdds = potentialQuads / totalHands;

    return { totalHands, potentialQuads, quadOdds };
  } else if (hand.length === 1) {
    const matchingQuads =
      deckRankCounts[handRanks[0]] === 3 ? filteredDeck.length - 3 : 0;
    const potentialQuads = matchingQuads + remainingQuads;
    const quadOdds = potentialQuads / totalHands;

    return { totalHands, potentialQuads, quadOdds };
  } else if (hand.length === 2) {
    if (isPaired) {
      const potentialQuads =
        deckRankCounts[handRanks[0]] === 2 ? filteredDeck.length - 2 : 0;
      const quadOdds = potentialQuads / totalHands;

      return { totalHands, potentialQuads, quadOdds };
    } else {
      const potentialQuad0 = deckRankCounts[handRanks[0]] === 3 ? 1 : 0;
      const potentialQuad1 = deckRankCounts[handRanks[1]] === 3 ? 1 : 0;
      const potentialQuads = potentialQuad0 + potentialQuad1;
      const quadOdds = potentialQuads / totalHands;

      return { totalHands, potentialQuads, quadOdds };
    }
  } else if (hand.length === 3) {
    if (isTrips) {
      // 1 of next 2 cards must match trips rank
      const potentialQuads =
        deckRankCounts[handRanks[0]] === 1 ? filteredDeck.length - 1 : 0;
      const quadOdds = potentialQuads / totalHands;

      return { totalHands, potentialQuads, quadOdds };
    } else if (isPaired) {
      // 2 of next 2 cards must match pair rank
      const pairRank = handRankCounts.indexOf(2);
      const potentialQuads = deckRankCounts[pairRank] === 2 ? 1 : 0;
      const quadOdds = potentialQuads / totalHands;

      return { totalHands, potentialQuads, quadOdds };
    } else {
      // Quad is impossible in 3 card hand w/o trips or pair
      const potentialQuads = 0;
      const quadOdds = 0;

      return { totalHands, potentialQuads, quadOdds };
    }
  } else if (hand.length === 4) {
    if (isQuads) {
      const potentialQuads = filteredDeck.length;
      const quadOdds = potentialQuads / totalHands;

      return { totalHands, potentialQuads, quadOdds };
    }
    // Next card must match to trips rank
    else if (isTrips) {
      const potentialQuads = deckRankCounts[handRanks[0]] === 1 ? 1 : 0;
      const quadOdds = potentialQuads / totalHands;

      return { totalHands, potentialQuads, quadOdds };
    } else {
      // Quad is impossible in 4 card hand w/o at least trips
      const potentialQuads = 0;
      const quadOdds = 0;

      return { totalHands, potentialQuads, quadOdds };
    }
  } else if (hand.length === 5) {
    if (isQuads) {
      const potentialQuads = 1;
      const quadOdds = potentialQuads / totalHands;

      return { totalHands, potentialQuads, quadOdds };
    } else {
      const potentialQuads = 0;
      const quadOdds = 0;

      return { totalHands, potentialQuads, quadOdds };
    }
  } else {
    return { totalHands, potentialQuads: 0, quadOdds: 0 };
    // console.log('not available for hands greater than 5 cards');
    // return null;
  }
};

export const getFullhouseDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const deckRankCounts = new Array(13).fill(0);
  const handRankCounts = new Array(13).fill(0);
  const handRanks = hand.map((card) => card % 13);
  const filteredDeck = deck.filter(
    (x) => !hand.includes(x) && !discards.includes(x)
  );
  filteredDeck.forEach((card) => {
    const rank = card % 13;
    deckRankCounts[rank]++;
  });
  hand.forEach((card) => {
    const rank = card % 13;
    handRankCounts[rank]++;
  });
  const totalHands = getTotalCombinations(filteredDeck.length, 5 - hand.length);
  const remainingQuads = deckRankCounts.filter((count) => count === 4).length;
  const remainingTrips = deckRankCounts.filter((count) => count === 3).length;
  const remainingPairs = deckRankCounts.filter((count) => count === 2).length;

  const isQuads = Math.max(...handRankCounts) === 4;
  const isTrips = Math.max(...handRankCounts) === 3;
  const isPaired = Math.max(...handRankCounts) === 2;
  const isTwoPaired =
    handRankCounts.filter((count) => count === 2).length === 2;
  //   const isUnmatched = Math.max(...handRankCounts) < 2;

  let potentialFullHouses = 0;

  if (hand.length === 0) {
    const tripsFromRemainingQuads = remainingQuads * 4;
    const pairsFromQuads = remainingQuads * 6;
    const pairsFromTrips = remainingTrips * 3;
    const pairsFromPairs = remainingPairs;

    const quadquad =
      remainingQuads > 0
        ? tripsFromRemainingQuads * (remainingQuads - 1) * 6
        : 0;
    const quadtrip =
      remainingQuads > 0 ? tripsFromRemainingQuads * pairsFromTrips : 0;
    const quadpair =
      remainingQuads > 0 ? tripsFromRemainingQuads * pairsFromPairs : 0;

    const tripquad = remainingTrips * pairsFromQuads;
    const triptrip =
      remainingTrips > 0 ? remainingTrips * (remainingTrips - 1) * 3 : 0;
    const trippair = remainingTrips > 0 ? remainingTrips * pairsFromPairs : 0;

    potentialFullHouses =
      quadquad + quadtrip + quadpair + tripquad + triptrip + trippair; // + e + f;

    return { totalHands, potentialFullHouses };
  } else if (hand.length === 1) {
    const matchingTrips =
      deckRankCounts[handRanks[0]] === 3
        ? 3
        : deckRankCounts[handRanks[0]] === 2
        ? 1
        : 0;

    const matchingPairs =
      deckRankCounts[handRanks[0]] === 3
        ? 3
        : deckRankCounts[handRanks[0]] === 2
        ? 2
        : deckRankCounts[handRanks[0]] === 1
        ? 1
        : 0;

    const matchedFromQuad = deckRankCounts[handRanks[0]] === 3 ? 1 : 0;
    const matchedFromTrip = deckRankCounts[handRanks[0]] === 2 ? 1 : 0;

    const tripsFromRemainingQuads = remainingQuads * 4;
    const tripsFromRemainingTrips = remainingTrips - matchedFromQuad;

    const pairsFromQuads = remainingQuads * 6;
    const pairsFromTrips = (remainingTrips - matchedFromQuad) * 3;
    const pairsFromPairs = remainingPairs - matchedFromTrip;

    const matchTripPair =
      matchingTrips * (pairsFromQuads + pairsFromTrips + pairsFromPairs);

    const matchPairTrip =
      matchingPairs * (tripsFromRemainingQuads + tripsFromRemainingTrips);

    potentialFullHouses = matchTripPair + matchPairTrip;

    return { totalHands, potentialFullHouses };
  } else if (hand.length === 2) {
    if (isPaired) {
      // Matching Trips * Remaining Pairs
      const matchingTrips =
        deckRankCounts[handRanks[0]] === 2
          ? 2
          : deckRankCounts[handRanks[0]] === 1
          ? 1
          : 0;

      const matchedFromQuad = deckRankCounts[handRanks[0]] === 2 ? 1 : 0;

      const tripsFromRemainingQuads = remainingQuads * 4;
      const tripsFromRemainingTrips = remainingTrips;

      const pairsFromQuads = remainingQuads * 6;
      const pairsFromTrips = remainingTrips * 3;
      const pairsFromPairs = remainingPairs - matchedFromQuad;

      const matchTripPair =
        matchingTrips * (pairsFromQuads + pairsFromTrips + pairsFromPairs);

      const matchPairTrip = tripsFromRemainingQuads + tripsFromRemainingTrips;

      potentialFullHouses = matchTripPair + matchPairTrip;

      return { totalHands, potentialFullHouses };
    } else {
      const [card0, card1] = handRanks;
      // Trips from hand[0] * Pairs from hand[1]
      const matchingTripsCard0 =
        deckRankCounts[card0] === 3 ? 3 : deckRankCounts[card0] === 2 ? 1 : 0;
      const matchingTripsCard1 =
        deckRankCounts[card1] === 3 ? 3 : deckRankCounts[card1] === 2 ? 1 : 0;
      const matchingPairsCard0 =
        deckRankCounts[card0] === 3
          ? 3
          : deckRankCounts[card0] === 2
          ? 2
          : deckRankCounts[card0] === 1
          ? 1
          : 0;
      const matchingPairsCard1 =
        deckRankCounts[card1] === 3
          ? 3
          : deckRankCounts[card1] === 2
          ? 2
          : deckRankCounts[card1] === 1
          ? 1
          : 0;

      const card0TripsCard1Pairs = matchingTripsCard0 * matchingPairsCard1;
      const card1TripsCard0Pairs = matchingTripsCard1 * matchingPairsCard0;
      potentialFullHouses = card0TripsCard1Pairs + card1TripsCard0Pairs;

      return { totalHands, potentialFullHouses };
    }
  } else if (hand.length === 3) {
    if (isTrips) {
      const pairsFromQuads = remainingQuads * 6;
      const pairsFromTrips = remainingTrips * 3;
      const pairsFromPairs = remainingPairs;

      potentialFullHouses = pairsFromQuads + pairsFromTrips + pairsFromPairs;

      return { totalHands, potentialFullHouses };
    } else if (isPaired) {
      const pairRank = handRankCounts.indexOf(2);
      const unPairedRank = handRankCounts.indexOf(1);

      const pairMatchingTrips =
        deckRankCounts[pairRank] === 2
          ? 2
          : deckRankCounts[pairRank] === 1
          ? 1
          : 0;

      const unPairedMatchingTrips =
        deckRankCounts[unPairedRank] === 3
          ? 3
          : deckRankCounts[unPairedRank] === 2
          ? 1
          : 0;

      const unPairedMatchingPairs =
        deckRankCounts[unPairedRank] === 3
          ? 3
          : deckRankCounts[unPairedRank] === 2
          ? 2
          : deckRankCounts[unPairedRank] === 1
          ? 1
          : 0;

      potentialFullHouses =
        pairMatchingTrips * unPairedMatchingPairs + unPairedMatchingTrips;

      return { totalHands, potentialFullHouses };
    } else {
      return { totalHands, potentialFullHouses };
    }
  } else if (hand.length === 4) {
    // Must have trips or two pair
    if (isTrips) {
      // const pairRank = handRankCounts.indexOf(2);
      const unPairedRank = handRankCounts.indexOf(1);
      const unPairedMatchingPairs =
        deckRankCounts[unPairedRank] === 3
          ? 3
          : deckRankCounts[unPairedRank] === 2
          ? 2
          : deckRankCounts[unPairedRank] === 1
          ? 1
          : 0;

      potentialFullHouses = unPairedMatchingPairs;

      return { totalHands, potentialFullHouses };
    } else if (isTwoPaired) {
      const firstPairRank = handRankCounts.indexOf(2);
      const lastPairRank = handRankCounts.lastIndexOf(2);

      const firstPairMatchingTrips =
        deckRankCounts[firstPairRank] === 2
          ? 2
          : deckRankCounts[firstPairRank] === 1
          ? 1
          : 0;

      const lastPairMatchingTrips =
        deckRankCounts[lastPairRank] === 2
          ? 2
          : deckRankCounts[lastPairRank] === 1
          ? 1
          : 0;

      potentialFullHouses = firstPairMatchingTrips + lastPairMatchingTrips;

      return { totalHands, potentialFullHouses };
    } else {
      return { totalHands, potentialFullHouses };
    }
  } else if (hand.length === 5) {
    if (isQuads) {
      return { totalHands, potentialFullHouses };
    } else {
      return { totalHands, potentialFullHouses };
    }
  } else {
    return { totalHands, potentialFullHouses };
  }
};

export const getTripDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const deckRankCounts = new Array(13).fill(0);
  const handRankCounts = new Array(13).fill(0);
  const handRanks = hand.map((card) => card % 13);
  const filteredDeck = deck.filter(
    (x) => !hand.includes(x) && !discards.includes(x)
  );
  filteredDeck.forEach((card) => {
    const rank = card % 13;
    deckRankCounts[rank]++;
  });
  hand.forEach((card) => {
    const rank = card % 13;
    handRankCounts[rank]++;
  });
  // const totalHands = getTotalCombinations(filteredDeck.length, 5 - hand.length);
  const remainingQuads = deckRankCounts.filter((count) => count === 4).length;
  const remainingTrips = deckRankCounts.filter((count) => count === 3).length;
  const isTrips = Math.max(...handRankCounts) === 3;
  const isPaired = Math.max(...handRankCounts) === 2;
  const isTwoPaired =
    handRankCounts.filter((count) => count === 2).length === 2;
  // const isUnmatched = Math.max(...handRankCounts) < 2;

  const { potentialFullHouses } = getFullhouseDraws({ hand, discards, deck });
  let potentialTrips = 0;

  if (hand.length === 0) {
    const tripsFromRemainingQuads = remainingQuads * 4;
    const tripsFromRemainingTrips = remainingTrips;

    const tripsFromQuadHandCombos =
      getTotalCombinations(filteredDeck.length - 4, 2) *
      tripsFromRemainingQuads;

    const tripsFromTripHandCombos =
      getTotalCombinations(filteredDeck.length - 3, 2) *
      tripsFromRemainingTrips;

    potentialTrips =
      tripsFromQuadHandCombos + tripsFromTripHandCombos - potentialFullHouses;
  } else if (hand.length === 1) {
    const matchingTripsFromQuads = deckRankCounts[handRanks[0]] === 3 ? 3 : 0;
    const matchingTripsFromTrips = deckRankCounts[handRanks[0]] === 2 ? 1 : 0;

    const tripsFromRemainingQuads = remainingQuads * 4;
    const tripsFromRemainingTrips =
      deckRankCounts[handRanks[0]] === 3 ? remainingTrips - 1 : remainingTrips;

    const matchingTripsFromQuadCombos =
      matchingTripsFromQuads * getTotalCombinations(filteredDeck.length - 3, 2);

    const matchingTripsFromTripsCombos =
      matchingTripsFromTrips * getTotalCombinations(filteredDeck.length - 2, 2);

    const tripsFromRemainingQuadCombos =
      tripsFromRemainingQuads *
      getTotalCombinations(filteredDeck.length - 4, 1);

    const tripsFromRemainingTripsCompos =
      tripsFromRemainingTrips *
      getTotalCombinations(filteredDeck.length - 3, 1);

    potentialTrips =
      matchingTripsFromQuadCombos +
      matchingTripsFromTripsCombos +
      tripsFromRemainingQuadCombos +
      tripsFromRemainingTripsCompos -
      potentialFullHouses;
  } else if (hand.length === 2) {
    if (isPaired) {
      const matchingTripsFromQuads = deckRankCounts[handRanks[0]] === 2 ? 2 : 0;
      const matchingTripsFromTrips = deckRankCounts[handRanks[0]] === 1 ? 1 : 0;
      const matchingTripsFromQuadCombos =
        matchingTripsFromQuads *
        getTotalCombinations(filteredDeck.length - 2, 2);
      const matchingTripsFromTripsCombos =
        matchingTripsFromTrips *
        getTotalCombinations(filteredDeck.length - 1, 2);
      const tripsFromRemainingQuads = remainingQuads * 4;
      const tripsFromRemainingTrips = remainingTrips;
      potentialTrips =
        matchingTripsFromQuadCombos +
        matchingTripsFromTripsCombos +
        tripsFromRemainingQuads +
        tripsFromRemainingTrips -
        potentialFullHouses;
    } else {
      const [card0, card1] = handRanks;

      const card0isFromQuad = deckRankCounts[card0] === 3;
      const card0isFromTrip = deckRankCounts[card0] === 2;
      // const card0cannotTrip = deckRankCounts[card0] <= 1;
      const card1isFromQuad = deckRankCounts[card1] === 3;
      const card1isFromTrip = deckRankCounts[card1] === 2;
      // const card1cannotTrip = deckRankCounts[card1] <= 1;

      const matchingTripsCard0 = card0isFromQuad ? 3 : card0isFromTrip ? 1 : 0;
      const matchingTripsCard1 = card1isFromQuad ? 3 : card1isFromTrip ? 1 : 0;

      const tripsFromRemainingQuads = remainingQuads * 4;
      const tripsFromRemainingTrips =
        remainingTrips - (card0isFromQuad ? 1 : 0) - (card1isFromQuad ? 1 : 0);

      const tripCard0Combos =
        matchingTripsCard0 *
        getTotalCombinations(
          filteredDeck.length - (card0isFromQuad ? 3 : 2),
          1
        );
      const tripCard1Combos =
        matchingTripsCard1 *
        getTotalCombinations(
          filteredDeck.length - (card1isFromQuad ? 3 : 2),
          1
        );

      potentialTrips =
        tripCard0Combos +
        tripCard1Combos +
        tripsFromRemainingQuads +
        tripsFromRemainingTrips -
        potentialFullHouses;
    }
  } else if (hand.length === 3) {
    if (isTrips) {
      const tripsFromQuads = deckRankCounts[handRanks[0]] === 1;
      const remainingCombinations = getTotalCombinations(
        tripsFromQuads ? filteredDeck.length - 1 : filteredDeck.length,
        2
      );
      potentialTrips = remainingCombinations - potentialFullHouses;
    } else if (isPaired) {
      const pairRank = handRankCounts.indexOf(2);
      const unPairedRank = handRankCounts.indexOf(1);

      const pairMatchingTrips =
        deckRankCounts[pairRank] === 2
          ? 2
          : deckRankCounts[pairRank] === 1
          ? 1
          : 0;

      const unPairedMatchingTrips =
        deckRankCounts[unPairedRank] === 3
          ? 3
          : deckRankCounts[unPairedRank] === 2
          ? 1
          : 0;

      const pairMatchingTripsCombos =
        pairMatchingTrips *
        (filteredDeck.length - (deckRankCounts[pairRank] === 2 ? 2 : 1));

      potentialTrips =
        pairMatchingTripsCombos + unPairedMatchingTrips - potentialFullHouses;
    } else {
      const [card0, card1, card2] = handRanks;
      const card0trip =
        deckRankCounts[card0] === 3 ? 3 : deckRankCounts[card0] === 2 ? 1 : 0;
      const card1trip =
        deckRankCounts[card1] === 3 ? 3 : deckRankCounts[card1] === 2 ? 1 : 0;
      const card2trip =
        deckRankCounts[card2] === 3 ? 3 : deckRankCounts[card2] === 2 ? 1 : 0;

      potentialTrips = card0trip + card1trip + card2trip;
    }
  } else if (hand.length === 4) {
    if (isTrips) {
      //
      const tripRank = handRankCounts.indexOf(3);
      const unMatchedRank = handRankCounts.indexOf(1);

      const remainingCombinations = filteredDeck.length;
      const remainingQuads = deckRankCounts[tripRank];
      const remainingPairs = deckRankCounts[unMatchedRank];

      potentialTrips = remainingCombinations - remainingQuads - remainingPairs;
    } else if (isPaired && !isTwoPaired) {
      const pairRank = handRankCounts.indexOf(2);
      const pairMatchingTrips =
        deckRankCounts[pairRank] === 2
          ? 2
          : deckRankCounts[pairRank] === 1
          ? 1
          : 0;

      potentialTrips = pairMatchingTrips;
    }
  } else if (hand.length === 5) {
    if (isTrips && !isPaired) {
      potentialTrips = 1;
    }
  }

  return { potentialTrips };
};

export const getTwoPairDraws = (props: getDrawsProps) => {
  // TODO: Replace hardcoded values with algorithm.

  const { hand = [], discards = [], deck = standardDeck } = props;
  const deckRankCounts = new Array(13).fill(0);
  const handRanks: number[] = [];
  const handRankCounts = new Array(13).fill(0);
  const discardRankCounts = new Array(13).fill(0);

  const filteredDeck = deck.filter(
    (x) => !hand.includes(x) && !discards.includes(x)
  );
  filteredDeck.forEach((card) => {
    const rank = card % 13;
    deckRankCounts[rank]++;
  });

  hand.forEach((card) => {
    const rank = card % 13;
    handRanks.push(rank);
    handRankCounts[rank]++;
  });

  const handUnmatchedCards: number[] = [];
  const handPairs: number[] = [];
  handRankCounts.forEach((count, index) => {
    if (count === 1) {
      handUnmatchedCards.push(index);
    } else if (count === 2) {
      handPairs.push(index);
    }
  });

  discards.forEach((card) => {
    const rank = card % 13;
    discardRankCounts[rank]++;
  });

  const discardedPairs = [];
  discardRankCounts.forEach((count, index) => {
    if (count === 2) {
      discardedPairs.push(index);
    }
  });

  const remainingQuads = deckRankCounts.filter((count) => count === 4).length;
  const remainingTrips = deckRankCounts.filter((count) => count === 3).length;
  const remainingPairs = deckRankCounts.filter((count) => count === 2).length;

  const discardedPair = discardedPairs.length === 1;
  const discardedTrip = Math.max(...discardRankCounts) === 3;
  const discardedFullHouse = discardedPair && discardedTrip;
  const discardedQuad = Math.max(...discardRankCounts) === 4;
  const discardedTwoPair = discardedPairs.length === 2;
  const discardedUnmatched = Math.max(...discardRankCounts) < 2;

  const handPair = handPairs.length === 1;
  const handTwoPair = handPairs.length === 2;
  const handTrip = Math.max(...handRankCounts) === 3;
  const handQuad = Math.max(...handRankCounts) === 4;
  const handUnmatched = Math.max(...handRankCounts) < 2;

  let potentialTwoPairs = 0;
  const remainingCards = filteredDeck.length;

  if (hand.length === 0) {
    if (remainingCards === 52) {
      potentialTwoPairs = 123552;
    } else if (remainingCards === 51) {
      potentialTwoPairs = 111672;
    } else if (remainingCards === 50) {
      if (Math.max(...discardRankCounts) === 2) {
        potentialTwoPairs = 102960;
      } else {
        potentialTwoPairs = 100584;
      }
    } else if (remainingCards === 49) {
      if (discardedPair) {
        potentialTwoPairs = 92466;
      } else if (discardedTrip) {
        potentialTwoPairs = 97416;
      } else {
        potentialTwoPairs = 90261;
      }
    } else if (remainingCards === 48) {
      if (discardedUnmatched) {
        potentialTwoPairs = 80676;
      } else if (discardedPair) {
        potentialTwoPairs = 82716;
      } else if (discardedTwoPair) {
        potentialTwoPairs = 84788;
      } else if (discardedTrip) {
        potentialTwoPairs = 87318;
      } else if (discardedQuad) {
        potentialTwoPairs = 95040;
      }
    } else if (remainingCards === 47) {
      if (discardedUnmatched) {
        potentialTwoPairs = 71802;
      } else if (discardedFullHouse) {
        potentialTwoPairs = 79926;
      } else if (discardedPair) {
        potentialTwoPairs = 73683;
      } else if (discardedTwoPair) {
        potentialTwoPairs = 75595;
      } else if (discardedTrip) {
        potentialTwoPairs = 77949;
      } else if (discardedQuad) {
        potentialTwoPairs = 85140;
      }
    }
  } else if (hand.length === 1) {
    if (remainingCards === 51) {
      //
    } else if (remainingCards === 50) {
      //
    } else if (remainingCards === 49) {
      //
    } else if (remainingCards === 48) {
      //
    } else if (remainingCards === 47) {
      //
      if (discardRankCounts[hand[0] % 13] === 1) {
        potentialTwoPairs = discardedPair ? 7121 : discardedTrip ? 7392 : 6993;
      } else if (discardRankCounts[hand[0] % 13] === 2) {
        potentialTwoPairs = discardedTwoPair ? 4862 : 4767;
      } else if (discardRankCounts[hand[0] % 13] === 3) {
        potentialTwoPairs = 2178;
      } else {
        potentialTwoPairs = discardedQuad
          ? 9900
          : discardedTrip
          ? 9369
          : discardedTwoPair
          ? 9193
          : discardedPair
          ? 9033
          : 8874;
      }
    }
  } else if (hand.length === 2) {
    const [card0, card1] = handRanks;

    if (card0 === card1) {
      const pairFromQuad = deckRankCounts[card0] === 2;
      const pairFromTrip = deckRankCounts[card0] === 1;

      const pairsFromQuads = remainingQuads * 6;
      const pairsFromTrips = remainingTrips * 3;
      const pairsFromPairs = pairFromQuad ? remainingPairs - 1 : remainingPairs;

      const adjustedRemainingCards = pairFromQuad
        ? remainingCards - 4
        : pairFromTrip
        ? remainingCards - 3
        : remainingCards - 2;

      potentialTwoPairs =
        pairsFromQuads * (adjustedRemainingCards - 2) +
        pairsFromTrips * (adjustedRemainingCards - 1) +
        pairsFromPairs * adjustedRemainingCards;
    } else {
      const matchingPair0 = deckRankCounts[card0];
      const matchingPair1 = deckRankCounts[card1];
      const adjustedRemainingCards =
        remainingCards - matchingPair0 - matchingPair1;

      const adjustedRemainingTrips =
        matchingPair0 === 3 && matchingPair1 === 3
          ? remainingTrips - 2
          : matchingPair0 === 3 || matchingPair1 === 3
          ? remainingTrips - 1
          : remainingTrips;

      const pairsFromQuads = remainingQuads * 6;
      const pairsFromTrips = adjustedRemainingTrips * 3;
      const pairsFromPairs =
        matchingPair0 === 2 && matchingPair1 === 2
          ? remainingPairs - 2
          : matchingPair0 === 2 || matchingPair1 === 2
          ? remainingPairs - 1
          : remainingPairs;

      potentialTwoPairs =
        pairsFromQuads * (matchingPair0 + matchingPair1) +
        pairsFromTrips * matchingPair0 +
        pairsFromTrips * matchingPair1 +
        pairsFromPairs * matchingPair0 +
        pairsFromPairs * matchingPair1 +
        matchingPair0 * matchingPair1 * adjustedRemainingCards;
    }
  } else if (hand.length === 3) {
    // Two pair only possible with 3 unmatched or single pair of cards
    if (handPair) {
      //
      const pairCard = handRankCounts.indexOf(2);
      const unMatchedCard = handRankCounts.indexOf(1);

      // 3C1 | 2C1 | 1C1, This equals the total combinations to pair this card
      // AND also the total to remove from the remainingCards
      const totalUnmatchedRank = deckRankCounts[unMatchedCard];

      // We will need to remove this amount from remainingCards
      // If === 2, we will also subtract 1 from remainingPairs
      const totalPairedRank = deckRankCounts[pairCard];

      const adjustedRemainingCards =
        remainingCards - totalUnmatchedRank - totalPairedRank;

      const adjustedRemainingTrips =
        totalUnmatchedRank === 3 ? remainingTrips - 1 : remainingTrips;

      const pairsFromQuads = remainingQuads * 6;
      const pairsFromTrips = adjustedRemainingTrips * 3;
      const pairsFromPairs =
        totalUnmatchedRank === 2 && totalPairedRank === 2
          ? remainingPairs - 2
          : totalUnmatchedRank === 2 || totalPairedRank === 2
          ? remainingPairs - 1
          : remainingPairs;

      potentialTwoPairs =
        pairsFromQuads +
        pairsFromTrips +
        pairsFromPairs +
        totalUnmatchedRank * adjustedRemainingCards;
    } else if (handUnmatched) {
      // 2 of the 3 unmatched cards must pair up to make two pair.
      const [card0, card1, card2] = hand.map((card) => card % 13);
      const matchingPair0 = deckRankCounts[card0];
      const matchingPair1 = deckRankCounts[card1];
      const matchingPair2 = deckRankCounts[card2];

      potentialTwoPairs =
        matchingPair0 * matchingPair1 +
        matchingPair0 * matchingPair2 +
        matchingPair1 * matchingPair2;
    } else {
      // Trips cannot make two pair
      potentialTwoPairs = 0;
    }
  } else if (hand.length === 4) {
    // Two pair only possible with 4 unmatched or single pair of cards
    if (handUnmatched || handQuad || handTrip) {
      potentialTwoPairs = 0;
    } else if (handPair) {
      const [card0, card1] = handUnmatchedCards;
      const matchingPair0 = deckRankCounts[card0];
      const matchingPair1 = deckRankCounts[card1];
      potentialTwoPairs = matchingPair0 + matchingPair1;
    } else if (handTwoPair) {
      // Must avoid tripping up either pair to make 2 pair
      const [card0, card1] = handPairs;
      const matchingPair0 = deckRankCounts[card0];
      const matchingPair1 = deckRankCounts[card1];
      potentialTwoPairs = remainingCards - matchingPair0 - matchingPair1;
    }
  } else if (hand.length === 5) {
    potentialTwoPairs = handTwoPair ? 1 : 0;
  }

  return { potentialTwoPairs };
};

export const getJacksOrBetterDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const deckRankCounts = new Array(13).fill(0);
  const handRankCounts = new Array(13).fill(0);
  const discardRankCounts = new Array(13).fill(0);

  const handRanks = hand.map((card) => card % 13);

  const filteredDeck = getFilteredDeck({ hand, discards, deck });

  // const filteredDeck = deck.filter(
  //   (x) => !hand.includes(x) && !discards.includes(x)
  // );
  filteredDeck.forEach((card) => {
    const rank = card % 13;
    deckRankCounts[rank]++;
  });
  hand.forEach((card) => {
    const rank = card % 13;
    handRankCounts[rank]++;
  });
  const handPairs: number[] = [];
  handRankCounts.forEach((count, index) => {
    if (count === 2) {
      handPairs.push(index);
    }
  });

  discards.forEach((card) => {
    const rank = card % 13;
    discardRankCounts[rank]++;
  });
  const discardedPairs: number[] = [];
  discardRankCounts.forEach((count, index) => {
    if (count === 2) {
      discardedPairs.push(index);
    }
  });
  const discardedPair = discardedPairs.length === 1;
  const discardedTrip = Math.max(...discardRankCounts) === 3;
  const discardedFullHouse = discardedPair && discardedTrip;
  const discardedQuad = Math.max(...discardRankCounts) === 4;
  const discardedTwoPair = discardedPairs.length === 2;
  const discardedUnmatched = Math.max(...discardRankCounts) < 2;

  const upperPairs = discardedPairs.filter(
    (pair) => pair >= 10 || pair === 0
  ).length;
  const upperRanks = [deckRankCounts[0], ...deckRankCounts.slice(10)];
  const remainingJacksOrBetter = upperRanks.reduce((a, b) => a + b);
  // const upperRankQuads = upperRanks.filter((count) => count === 4).length;
  // const upperRankTrips = upperRanks.filter((count) => count === 3).length;
  const upperRankPairs = upperRanks.filter((count) => count === 2).length;
  // const upperRankSingles = upperRanks.filter((count) => count === 1).length;

  let potentialJacksOrBetter = 0;
  const remainingCards = filteredDeck.length;

  if (hand.length === 0) {
    if (remainingCards === 52) {
      potentialJacksOrBetter = 337920;
    } else if (remainingCards === 51) {
      potentialJacksOrBetter = remainingJacksOrBetter === 16 ? 316800 : 279840;
    } else if (remainingCards === 50) {
      potentialJacksOrBetter =
        remainingJacksOrBetter === 16
          ? discardedPair
            ? 295680
            : 296640
          : remainingJacksOrBetter === 15
          ? 262080
          : remainingJacksOrBetter === 14
          ? discardedPair
            ? 235840
            : 227520
          : 0;
    } else if (remainingCards === 49) {
      potentialJacksOrBetter =
        remainingJacksOrBetter === 16
          ? discardedTrip
            ? 274560
            : discardedPair
            ? 276480
            : 277416
          : remainingJacksOrBetter === 15
          ? discardedPair
            ? 244320
            : 245142
          : remainingJacksOrBetter === 14
          ? discardedPair
            ? 198216
            : 212868
          : remainingJacksOrBetter === 13
          ? discardedTrip
            ? 205920
            : discardedPair
            ? 188400
            : 180594
          : 0;
    } else if (remainingCards === 48) {
      //TODO COMEBACK TO THIS. REPLACE HARD VALUES
      potentialJacksOrBetter =
        remainingJacksOrBetter === 16
          ? discardedQuad
            ? 253440
            : discardedTrip
            ? 256320
            : discardedTwoPair
            ? 257280
            : discardedPair
            ? 258192
            : 259104
          : remainingJacksOrBetter === 15
          ? discardedTrip
            ? 226560
            : discardedPair
            ? 228204
            : 229005
          : remainingJacksOrBetter === 14
          ? discardedTwoPair
            ? 205280
            : discardedPair
            ? upperRankPairs === 1
              ? 206004
              : 198216
            : 0
          : remainingJacksOrBetter === 13
          ? discardedTrip
            ? 205920
            : discardedPair
            ? 188400
            : 180594
          : remainingJacksOrBetter === 12
          ? discardedTrip
            ? 205920
            : discardedPair
            ? 188400
            : 180594
          : 0;
    } else if (remainingCards === 47) {
      if (discardedUnmatched) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 241680
            : remainingJacksOrBetter === 15
            ? 213648
            : remainingJacksOrBetter === 14
            ? 185616
            : remainingJacksOrBetter === 13
            ? 157584
            : remainingJacksOrBetter === 12
            ? 129552
            : 0;
      } else if (discardedQuad) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 236160
            : remainingJacksOrBetter === 15
            ? 208800
            : remainingJacksOrBetter === 12
            ? 177120
            : remainingJacksOrBetter === 11
            ? 149760
            : 0;
      } else if (discardedFullHouse) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 238080
            : remainingJacksOrBetter === 14
            ? 190000
            : remainingJacksOrBetter === 13
            ? 178560
            : remainingJacksOrBetter === 11
            ? 130480
            : 0;
      } else if (discardedPair) {
        if (upperRankPairs === 1) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 14
              ? 192153
              : remainingJacksOrBetter === 13
              ? 164229
              : remainingJacksOrBetter === 12
              ? 136305
              : remainingJacksOrBetter === 11
              ? 108381
              : 0;
        } else {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 16
              ? 240792
              : remainingJacksOrBetter === 15
              ? 212868
              : remainingJacksOrBetter === 14
              ? 184944
              : remainingJacksOrBetter === 13
              ? 157020
              : 0;
        }
      } else if (discardedTwoPair) {
        if (upperRankPairs === 2) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 12
              ? 142992
              : remainingJacksOrBetter === 11
              ? 115176
              : 0;
        } else if (upperRankPairs === 1) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 14
              ? 191448
              : remainingJacksOrBetter === 13
              ? 163632
              : 0;
        } else {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 16
              ? 239904
              : remainingJacksOrBetter === 15
              ? 212088
              : 0;
        }
      } else if (discardedTrip) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 238968
            : remainingJacksOrBetter === 15
            ? 211266
            : remainingJacksOrBetter === 14
            ? 183564
            : remainingJacksOrBetter === 13
            ? 179226
            : remainingJacksOrBetter === 12
            ? 151524
            : remainingJacksOrBetter === 11
            ? 123822
            : 0;
      }

      //
    }
  } else if (hand.length === 1) {
    const [cardRank] = handRanks;
    const remainingCardRank = deckRankCounts[cardRank];

    if (cardRank === 0 || cardRank >= 10) {
      if (discardedUnmatched) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 15
            ? 45456
            : remainingJacksOrBetter === 14
            ? remainingCardRank === 3
              ? 43389
              : 36852
            : remainingJacksOrBetter === 13
            ? remainingCardRank === 3
              ? 41322
              : 34677
            : remainingJacksOrBetter === 12
            ? remainingCardRank === 3
              ? 39255
              : 32502
            : 0;
      } else if (discardedQuad) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 15
            ? 44640
            : remainingJacksOrBetter === 11
            ? 40320
            : 0;
      } else if (discardedTrip) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 15
            ? 45054
            : remainingJacksOrBetter === 14
            ? remainingCardRank === 3
              ? 42996
              : 36560
            : remainingJacksOrBetter === 12
            ? 40716
            : remainingJacksOrBetter === 11
            ? remainingCardRank === 3
              ? 38658
              : 32000
            : 0;
      } else if (discardedTwoPair) {
        if (upperPairs === 2) {
          potentialJacksOrBetter = remainingCardRank === 3 ? 38104 : 22800;
        } else if (upperPairs === 1) {
          potentialJacksOrBetter = remainingCardRank === 3 ? 41648 : 26720;
        } else {
          potentialJacksOrBetter = 45192;
        }
      } else if (discardedPair) {
        if (upperPairs === 1) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 13
              ? remainingCardRank === 3
                ? 41775
                : 26778
              : remainingJacksOrBetter === 12
              ? remainingCardRank === 3
                ? 39711
                : remainingCardRank === 2
                ? 33024
                : 24492
              : remainingJacksOrBetter === 11
              ? remainingCardRank === 3
                ? 37647
                : remainingCardRank === 2
                ? 30852
                : 22206
              : 0;
        } else {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 15
              ? 45324
              : remainingJacksOrBetter === 14
              ? remainingCardRank === 3
                ? 43260
                : 36756
              : remainingJacksOrBetter === 13
              ? remainingCardRank === 3
                ? 41196
                : 34584
              : 0;
        }
      }
    } else {
      if (discardedUnmatched) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? remainingCardRank === 3
              ? 17424
              : 18312
            : remainingJacksOrBetter === 15
            ? remainingCardRank === 3
              ? 15357
              : 16137
            : remainingJacksOrBetter === 14
            ? remainingCardRank === 3
              ? 13290
              : 13962
            : remainingJacksOrBetter === 13
            ? remainingCardRank === 3
              ? 11223
              : 11787
            : remainingJacksOrBetter === 12
            ? 9156
            : 0;
      } else if (discardedQuad) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 17280
            : remainingJacksOrBetter === 12
            ? 12960
            : 0;
      } else if (discardedTrip) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? remainingCardRank === 3
              ? 17352
              : remainingCardRank === 2
              ? 18240
              : 20160
            : remainingJacksOrBetter === 15
            ? remainingCardRank === 3
              ? 15294
              : 17760
            : remainingJacksOrBetter === 13
            ? remainingCardRank === 3
              ? 13014
              : 13680
            : remainingJacksOrBetter === 12
            ? 10956
            : 0;
      } else if (discardedTwoPair) {
        const upperPairs = discardedPairs.filter(
          (pair) => pair >= 10 || pair === 0
        ).length;

        if (upperPairs === 2) {
          potentialJacksOrBetter = 10288;
        } else if (upperPairs === 1) {
          potentialJacksOrBetter = remainingCardRank === 3 ? 13832 : 15280; //remainingCardRank === 3 ? 13832 : 15280;
        } else {
          potentialJacksOrBetter = remainingCardRank === 3 ? 17376 : 19200; //remainingCardRank === 3 ? 13832 : 15280;
        }
      } else if (discardedPair) {
        if (upperPairs === 1) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 14
              ? remainingCardRank === 3
                ? 13851
                : 14556
              : remainingJacksOrBetter === 13
              ? remainingCardRank === 3
                ? 11787
                : 12384
              : remainingJacksOrBetter === 12
              ? 9723
              : 0;
        } else {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 16
              ? remainingCardRank === 3
                ? 17400
                : remainingCardRank === 2
                ? 18288
                : 19224
              : remainingJacksOrBetter === 15
              ? remainingCardRank === 3
                ? 15336
                : remainingCardRank === 2
                ? 16116
                : 16938
              : remainingJacksOrBetter === 14
              ? remainingCardRank === 3
                ? 13272
                : 14652
              : 0;
        }
      }
    }
  } else if (hand.length === 2) {
    // If Pair
    if (handPairs.length === 1) {
      const [pair] = handPairs;

      // If Jacks Or better, calculate odds of not improving hand
      if (pair === 0 || pair >= 10) {
        const remainingPairRank = deckRankCounts[pair];
        deckRankCounts[pair] = 0;
        const tripUpPair =
          remainingPairRank *
          getTotalCombinations(remainingCards - remainingPairRank, 2);

        const quadUpPair = remainingPairRank === 2 ? remainingCards - 2 : 0;

        const remainingQuads = deckRankCounts.filter(
          (count) => count === 4
        ).length;
        const remainingTrips = deckRankCounts.filter(
          (count) => count === 3
        ).length;
        const remainingPairs = deckRankCounts.filter(
          (count) => count === 2
        ).length;

        // const fullHousePair = remainingPairRank * remainingQuads * 6;
        const pairsFromQuads =
          remainingQuads * 6 * (remainingCards - 4 - remainingPairRank);
        const tripsFromQuads = remainingQuads * 4;
        const tripsFromTrips = remainingTrips;
        const pairsFromTrips =
          remainingTrips * 3 * (remainingCards - 3 - remainingPairRank);
        const pairsFromPairs =
          remainingPairs * (remainingCards - 2 - remainingPairRank);

        // const fullHouse = remainingPairRank * pairsFromQuads;

        const totalCombinations = getTotalCombinations(remainingCards, 3);

        potentialJacksOrBetter =
          totalCombinations -
          pairsFromQuads -
          tripsFromQuads -
          tripsFromTrips -
          pairsFromTrips -
          pairsFromPairs -
          tripUpPair -
          quadUpPair;

        console.log(
          remainingPairRank,
          pairsFromQuads,
          tripsFromQuads,
          tripUpPair
        );
      } else {
        return { potentialJacksOrBetter };
      }

      //
    } else {
      //
    }
  } else if (hand.length === 3) {
    const [card0, card1, card3] = handRanks;

    //
  } else if (hand.length === 4) {
    const [card0, card1, card3, card4] = handRanks;

    //
  } else if (hand.length === 5) {
    const [card0, card1, card3, card4, card5] = handRanks;

    //
  }

  return { potentialJacksOrBetter };
};

export const getHighCardDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const deckRankCounts = new Array(13).fill(0);
  const handRankCounts = new Array(13).fill(0);
  // const handRanks = hand.map((card) => card % 13);
  const filteredDeck = deck.filter(
    (x) => !hand.includes(x) && !discards.includes(x)
  );
  filteredDeck.forEach((card) => {
    const rank = card % 13;
    deckRankCounts[rank]++;
  });
  hand.forEach((card) => {
    const rank = card % 13;
    handRankCounts[rank]++;
  });

  let potentialHighCards = 0;
  const remainingCards = filteredDeck.length;

  if (hand.length === 0) {
    if (remainingCards === 52) {
      potentialHighCards = 1302540;
    }
  }

  return { potentialHighCards };
};

export const getDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;

  const remainingCards = deck.filter(
    (card) => !hand.includes(card) && !discards.includes(card)
  ).length;

  const totalCombinations = getTotalCombinations(
    remainingCards,
    5 - hand.length
  );

  // const { potentialHighCards } = getHighCardDraws({ hand, discards, deck });

  const { potentialJacksOrBetter } = getJacksOrBetterDraws({
    hand,
    discards,
    deck,
  });
  const { potentialTwoPairs } = getTwoPairDraws({ hand, discards, deck });
  const { potentialTrips } = getTripDraws({ hand, discards, deck });
  const { potentialStraights } = getStraightDraws({ hand, discards, deck });
  const { potentialFlushes } = getFlushDraws({ hand, discards, deck });
  const { potentialFullHouses } = getFullhouseDraws({ hand, discards, deck });
  const { potentialQuads } = getQuadDraws({ hand, discards, deck });
  const { potentialStraightFlushes, potentialRoyalFlushes } =
    getStraightFlushDraws({ hand, discards, deck });

  const LowPairOrWorse =
    totalCombinations -
    (potentialJacksOrBetter +
      potentialTwoPairs +
      potentialTrips +
      potentialStraights +
      potentialFlushes +
      potentialFullHouses +
      potentialQuads +
      potentialStraightFlushes +
      potentialRoyalFlushes);

  return {
    0: LowPairOrWorse,
    100: 0,
    110: potentialJacksOrBetter,
    200: potentialTwoPairs,
    300: potentialTrips,
    400: potentialStraights, // - potentialStraightFlushes - potentialRoyalFlushes,
    500: potentialFlushes, // - potentialStraightFlushes - potentialRoyalFlushes,
    600: potentialFullHouses,
    700: potentialQuads,
    800: potentialStraightFlushes,
    900: potentialRoyalFlushes,
  };
};
