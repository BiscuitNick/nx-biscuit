import {
  standardDeck,
  getFilteredDeck,
  getRanks,
  getRankCounts,
} from '../deck';
import { getDrawsProps } from './getDrawValue';

export const getQuadDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const filteredDeck = getFilteredDeck({ hand, discards, deck });
  const remainingCards = filteredDeck.length;
  const deckRankCounts = getRankCounts(filteredDeck);
  const { quads, trips, pairs, kickers } = getRanks(hand);
  const { quads: deckQuads } = getRanks(filteredDeck);
  const remainingQuads = deckQuads.length;
  const isQuads = quads.length > 0;
  const isTrips = trips.length > 0;
  const isPaired = pairs.length > 0;

  let potentialQuads = 0;

  if (hand.length === 0) {
    potentialQuads = remainingQuads * (remainingCards - 4);
  } else if (hand.length === 1) {
    const [kicker] = kickers;
    const matchingQuads = deckRankCounts[kicker] === 3 ? remainingCards - 3 : 0;
    potentialQuads = matchingQuads + remainingQuads;
  } else if (hand.length === 2) {
    if (isPaired) {
      const [pair] = pairs;
      potentialQuads = deckRankCounts[pair] === 2 ? remainingCards - 2 : 0;
    } else {
      const [kicker0, kicker1] = kickers;
      const potentialQuad0 = deckRankCounts[kicker0] === 3 ? 1 : 0;
      const potentialQuad1 = deckRankCounts[kicker1] === 3 ? 1 : 0;
      potentialQuads = potentialQuad0 + potentialQuad1;
    }
  } else if (hand.length === 3) {
    // 1 of next 2 cards must match trips rank
    if (isTrips) {
      const [trip] = trips;
      potentialQuads = deckRankCounts[trip] === 1 ? remainingCards - 1 : 0;
    }
    // 2 of next 2 cards must match pair rank
    else if (isPaired) {
      const [pair] = pairs;
      potentialQuads = deckRankCounts[pair] === 2 ? 1 : 0;
    }
  } else if (hand.length === 4) {
    if (isQuads) {
      potentialQuads = filteredDeck.length;
    }
    // Next card must match to trips rank
    else if (isTrips) {
      const [trip] = trips;
      potentialQuads = deckRankCounts[trip] === 1 ? 1 : 0;
    }
    // Quad is impossible in 4 card hand w/o at least trips
  } else if (hand.length === 5) {
    if (isQuads) {
      potentialQuads = 1;
    }
  }

  return { potentialQuads };
};
