import {
  standardDeck,
  getFilteredDeck,
  getRanks,
  getRankCounts,
} from '../deck';
import { getDrawsProps } from './getDrawValue';

export const getFullhouseDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const filteredDeck = getFilteredDeck({ hand, discards, deck });
  const deckRankCounts = getRankCounts(filteredDeck);
  const {
    quads: deckQuads,
    trips: deckTrips,
    pairs: deckPairs,
  } = getRanks(filteredDeck);
  const { trips, pairs, kickers } = getRanks(hand);
  const remainingQuads = deckQuads.length;
  const remainingTrips = deckTrips.length;
  const remainingPairs = deckPairs.length;
  const isTrips = trips.length > 0;
  const isPaired = pairs.length === 1;
  const isTwoPaired = pairs.length === 2;

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
      quadquad + quadtrip + quadpair + tripquad + triptrip + trippair;
  } else if (hand.length === 1) {
    const [kicker] = kickers;
    const matchingTrips =
      deckRankCounts[kicker] === 3 ? 3 : deckRankCounts[kicker] === 2 ? 1 : 0;
    const matchingPairs =
      deckRankCounts[kicker] === 3
        ? 3
        : deckRankCounts[kicker] === 2
        ? 2
        : deckRankCounts[kicker] === 1
        ? 1
        : 0;
    const matchedFromQuad = deckRankCounts[kicker] === 3 ? 1 : 0;
    const matchedFromTrip = deckRankCounts[kicker] === 2 ? 1 : 0;
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
  } else if (hand.length === 2) {
    if (isPaired) {
      const [pair] = pairs;
      const matchingTrips =
        deckRankCounts[pair] === 2 ? 2 : deckRankCounts[pair] === 1 ? 1 : 0;
      const matchedFromQuad = deckRankCounts[pair] === 2 ? 1 : 0;
      const tripsFromRemainingQuads = remainingQuads * 4;
      const tripsFromRemainingTrips = remainingTrips;
      const pairsFromQuads = remainingQuads * 6;
      const pairsFromTrips = remainingTrips * 3;
      const pairsFromPairs = remainingPairs - matchedFromQuad;
      const matchTripPair =
        matchingTrips * (pairsFromQuads + pairsFromTrips + pairsFromPairs);
      const matchPairTrip = tripsFromRemainingQuads + tripsFromRemainingTrips;
      potentialFullHouses = matchTripPair + matchPairTrip;
    } else {
      const [card0, card1] = kickers;
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
    }
  } else if (hand.length === 3) {
    if (isTrips) {
      const pairsFromQuads = remainingQuads * 6;
      const pairsFromTrips = remainingTrips * 3;
      const pairsFromPairs = remainingPairs;
      potentialFullHouses = pairsFromQuads + pairsFromTrips + pairsFromPairs;
    } else if (isPaired) {
      const [pair] = pairs;
      const [kicker] = kickers;
      const pairMatchingTrips =
        deckRankCounts[pair] === 2 ? 2 : deckRankCounts[pair] === 1 ? 1 : 0;
      const unPairedMatchingTrips =
        deckRankCounts[kicker] === 3 ? 3 : deckRankCounts[kicker] === 2 ? 1 : 0;
      const unPairedMatchingPairs =
        deckRankCounts[kicker] === 3
          ? 3
          : deckRankCounts[kicker] === 2
          ? 2
          : deckRankCounts[kicker] === 1
          ? 1
          : 0;
      potentialFullHouses =
        pairMatchingTrips * unPairedMatchingPairs + unPairedMatchingTrips;
    }
  } else if (hand.length === 4) {
    if (isTrips) {
      const [kicker] = kickers;
      const unPairedMatchingPairs =
        deckRankCounts[kicker] === 3
          ? 3
          : deckRankCounts[kicker] === 2
          ? 2
          : deckRankCounts[kicker] === 1
          ? 1
          : 0;
      potentialFullHouses = unPairedMatchingPairs;
    } else if (isTwoPaired) {
      const [pair0, pair1] = pairs;
      const firstPairMatchingTrips =
        deckRankCounts[pair0] === 2 ? 2 : deckRankCounts[pair0] === 1 ? 1 : 0;
      const lastPairMatchingTrips =
        deckRankCounts[pair1] === 2 ? 2 : deckRankCounts[pair1] === 1 ? 1 : 0;
      potentialFullHouses = firstPairMatchingTrips + lastPairMatchingTrips;
    }
  } else if (hand.length === 5) {
    potentialFullHouses = isTrips && isPaired ? 1 : 0;
  }

  return { potentialFullHouses };
};
