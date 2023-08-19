import { getTotalCombinations } from '../getTotalCombinations';
import {
  standardDeck,
  getFilteredDeck,
  getSuitCounts,
  getSuitRankCounts,
} from '../deck';
import { getDrawsProps } from './getDrawValue';

export const getStraightFlushDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;

  const filteredDeck = getFilteredDeck({ hand, discards, deck });
  const suitRankCounts = getSuitRankCounts(filteredDeck);
  const totalHands = getTotalCombinations(filteredDeck.length, 5 - hand.length);

  let potentialStraightFlushes = 0;
  let potentialRoyalFlushes = 0;

  if (hand.length === 0) {
    suitRankCounts.forEach((suitRanks) => {
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

    return { totalHands, potentialStraightFlushes, potentialRoyalFlushes };
  } else {
    const handSuitRanks = getSuitRankCounts(hand);
    const handSuitCounts = getSuitCounts(hand);

    if (Math.max(...handSuitCounts) < hand.length) {
      return { totalHands, potentialStraightFlushes, potentialRoyalFlushes };
    } else {
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
      return {
        totalHands,
        potentialStraightFlushes,
        potentialRoyalFlushes,
      };
    }
  }
};
