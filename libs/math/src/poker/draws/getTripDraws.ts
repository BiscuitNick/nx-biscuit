import { getTotalCombinations } from '../getTotalCombinations';
import {
  standardDeck,
  getFilteredDeck,
  getRanks,
  getRankCounts,
} from '../deck';
import { getFullhouseDraws } from './getFullHouseDraws';
import { getDrawsProps } from './getDrawValue';

// TODO: Refactor me

export const getTripDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const filteredDeck = getFilteredDeck({ hand, discards, deck });
  const deckRankCounts = getRankCounts(filteredDeck);
  const { quads: deckQuads, trips: deckTrips } = getRanks(filteredDeck);
  const { trips, pairs, kickers } = getRanks(hand);
  const remainingQuads = deckQuads.length;
  const remainingTrips = deckTrips.length;
  const isTrips = trips.length === 1;
  const isPaired = pairs.length === 1;
  const isTwoPaired = pairs.length === 2;
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
    const [kicker] = kickers;

    const matchingTripsFromQuads = deckRankCounts[kicker] === 3 ? 3 : 0;
    const matchingTripsFromTrips = deckRankCounts[kicker] === 2 ? 1 : 0;

    const tripsFromRemainingQuads = remainingQuads * 4;
    const tripsFromRemainingTrips =
      deckRankCounts[kicker] === 3 ? remainingTrips - 1 : remainingTrips;

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
      const [pair] = pairs;
      const matchingTripsFromQuads = deckRankCounts[pair] === 2 ? 2 : 0;
      const matchingTripsFromTrips = deckRankCounts[pair] === 1 ? 1 : 0;
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
      const [card0, card1] = kickers;
      const card0isFromQuad = deckRankCounts[card0] === 3;
      const card0isFromTrip = deckRankCounts[card0] === 2;
      const card1isFromQuad = deckRankCounts[card1] === 3;
      const card1isFromTrip = deckRankCounts[card1] === 2;
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
      const [trip] = trips;
      const tripsFromQuads = deckRankCounts[trip] === 1;
      const remainingCombinations = getTotalCombinations(
        tripsFromQuads ? filteredDeck.length - 1 : filteredDeck.length,
        2
      );
      potentialTrips = remainingCombinations - potentialFullHouses;
    } else if (isPaired) {
      const [pair] = pairs;
      const [kicker] = kickers;
      const pairMatchingTrips =
        deckRankCounts[pair] === 2 ? 2 : deckRankCounts[pair] === 1 ? 1 : 0;
      const unPairedMatchingTrips =
        deckRankCounts[kicker] === 3 ? 3 : deckRankCounts[kicker] === 2 ? 1 : 0;
      const pairMatchingTripsCombos =
        pairMatchingTrips *
        (filteredDeck.length - (deckRankCounts[pair] === 2 ? 2 : 1));
      potentialTrips =
        pairMatchingTripsCombos + unPairedMatchingTrips - potentialFullHouses;
    } else {
      const [card0, card1, card2] = kickers;
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
      const [trip] = trips;
      const [kicker] = kickers;
      const remainingCombinations = filteredDeck.length;
      const remainingQuads = deckRankCounts[trip];
      const remainingPairs = deckRankCounts[kicker];
      potentialTrips = remainingCombinations - remainingQuads - remainingPairs;
    } else if (isPaired && !isTwoPaired) {
      const [pair] = pairs;
      const pairMatchingTrips =
        deckRankCounts[pair] === 2 ? 2 : deckRankCounts[pair] === 1 ? 1 : 0;
      potentialTrips = pairMatchingTrips;
    }
  } else if (hand.length === 5) {
    if (isTrips && !isPaired) {
      potentialTrips = 1;
    }
  }

  return potentialTrips;
};
