import { getTotalCombinations } from '../getTotalCombinations';
import { standardDeck, getFilteredDeck, getStraightRankCounts } from '../deck';
import { getStraightFlushDraws } from './getStraightFlushDraws';
import { getDrawsProps } from './getDrawValue';

export const getStraightDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const filteredDeck = getFilteredDeck({ hand, discards, deck });
  const rankCounts = getStraightRankCounts(filteredDeck);
  const handRanks = getStraightRankCounts(hand);
  const totalHands = getTotalCombinations(filteredDeck.length, 5 - hand.length);
  const { potentialStraightFlushes, potentialRoyalFlushes } =
    getStraightFlushDraws({ hand, discards, deck });
  let potentialStraights = -potentialStraightFlushes - potentialRoyalFlushes;

  if (hand.length === 0) {
    for (let i = 0; i < 10; i++) {
      const strSegment = rankCounts.slice(i, i + 5);
      const product = strSegment.reduce((a, b) => a * b);
      potentialStraights += product;
    }

    const straightOdds = potentialStraights / totalHands;

    return { totalHands, potentialStraights, straightOdds };
  } else {
    const pairOrBetter = handRanks.some((count) => count >= 2);

    if (pairOrBetter) {
      const straightOdds = 0;
      return { totalHands, potentialStraights, straightOdds };
    } else {
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
