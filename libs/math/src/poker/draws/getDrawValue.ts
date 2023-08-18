import { getTotalCombinations } from '../getTotalCombinations';
import { standardDeck, getFilteredDeck } from '../deck';
import { getStraightFlushDraws } from './getStraightFlushDraws';
import { getQuadDraws } from './getQuadDraws';
import { getFullhouseDraws } from './getFullHouseDraws';
import { getFlushDraws } from './getFlushDraws';
import { getStraightDraws } from './getStraightDraws';
import { getTripDraws } from './getTripDraws';
import { getTwoPairDraws } from './getTwoPairs';
import { getPairDraws } from './getPairDraws';
import { valueCounts } from '../constants';

export interface getDrawsProps {
  hand?: number[];
  discards?: number[];
  deck?: number[];
}

export const getDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const remainingCards = getFilteredDeck({ hand, discards, deck }).length;
  const totalCombinations = getTotalCombinations(
    remainingCards,
    5 - hand.length
  );

  const { lowPairs, highPairs } = getPairDraws({ hand, discards, deck });

  const twoPairs = getTwoPairDraws({ hand, discards, deck });
  const trips = getTripDraws({ hand, discards, deck });
  const { potentialStraights } = getStraightDraws({ hand, discards, deck });
  const flushes = getFlushDraws({ hand, discards, deck });
  const { potentialFullHouses } = getFullhouseDraws({ hand, discards, deck });
  const { potentialQuads } = getQuadDraws({ hand, discards, deck });
  const { potentialStraightFlushes, potentialRoyalFlushes } =
    getStraightFlushDraws({ hand, discards, deck });

  const LowPairOrWorse =
    totalCombinations -
    (lowPairs +
      highPairs +
      twoPairs +
      trips +
      potentialStraights +
      flushes +
      potentialFullHouses +
      potentialQuads +
      potentialStraightFlushes +
      potentialRoyalFlushes);

  const counts: valueCounts = {
    0: LowPairOrWorse,
    100: lowPairs,
    110: highPairs,
    200: twoPairs,
    300: trips,
    400: potentialStraights,
    500: flushes,
    600: potentialFullHouses,
    700: potentialQuads,
    800: potentialStraightFlushes,
    900: potentialRoyalFlushes,
  };

  const percents: valueCounts = {
    0: LowPairOrWorse / totalCombinations,
    100: lowPairs / totalCombinations,
    110: highPairs / totalCombinations,
    200: twoPairs / totalCombinations,
    300: trips / totalCombinations,
    400: potentialStraights / totalCombinations,
    500: flushes / totalCombinations,
    600: potentialFullHouses / totalCombinations,
    700: potentialQuads / totalCombinations,
    800: potentialStraightFlushes / totalCombinations,
    900: potentialRoyalFlushes / totalCombinations,
  };

  return {
    counts,
    percents,
    totalCombinations,
  };
};
