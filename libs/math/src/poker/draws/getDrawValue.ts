import { getTotalCombinations } from '../getTotalCombinations';
import {
  standardDeck,
  getFilteredDeck,
  getRankCounts,
  getRanks,
} from '../deck';
import { getStraightFlushDraws } from './getStraightFlushDraws';
import { getQuadDraws } from './getQuadDraws';
import { getFullhouseDraws } from './getFullHouseDraws';
import { getFlushDraws } from './getFlushDraws';
import { getStraightDraws } from './getStraightDraws';
import { getTripDraws } from './getTripDraws';
import { getTwoPairDraws } from './getTwoPairs';
import { getJacksOrBetterDraws } from './getJacksOrBetter';
import { getPairDraws } from './getPairDraws';

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
  // console.log(totalPotentialPairs, lowPairs, highPairs, potentialPairs);

  // const jacksOrBetter = getJacksOrBetterDraws({
  //   hand,
  //   discards,
  //   deck,
  // });
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

  return {
    0: LowPairOrWorse,
    100: lowPairs,
    105: lowPairs + highPairs,
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
};
