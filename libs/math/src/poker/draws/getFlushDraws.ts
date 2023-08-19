import { getTotalCombinations } from '../getTotalCombinations';
import { standardDeck, getFilteredDeck, getSuitCounts } from '../deck';
import { getDrawsProps } from './getDrawValue';
import { getStraightFlushDraws } from './getStraightFlushDraws';

export const getFlushDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const filteredDeck = getFilteredDeck({ hand, discards, deck });
  const suitCounts = getSuitCounts(filteredDeck);
  const { potentialStraightFlushes, potentialRoyalFlushes } =
    getStraightFlushDraws({ hand, discards, deck });
  const straightFlushes = potentialStraightFlushes + potentialRoyalFlushes;

  let potentialFlushes = -straightFlushes;

  if (hand.length === 0) {
    suitCounts.forEach((count) => {
      potentialFlushes += getTotalCombinations(count, 5);
    });
  } else {
    const handSuits = getSuitCounts(hand);
    const flushable = Math.max(...handSuits) === hand.length;

    if (flushable) {
      const suitIndex = handSuits.indexOf(hand.length);
      const flushOuts = suitCounts[suitIndex];
      potentialFlushes += getTotalCombinations(flushOuts, 5 - hand.length);
    }
  }
  return potentialFlushes;
};
