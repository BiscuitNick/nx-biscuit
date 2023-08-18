import {
  standardDeck,
  getFilteredDeck,
  getRankCounts,
  getRanks,
} from '../deck';
import { getDrawsProps } from './getDrawValue';
import { getComboProductSum } from '../getDrawCombinations';

export const getTwoPairDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const filteredDeck = getFilteredDeck({ hand, discards, deck });
  const deckRankCounts = getRankCounts(filteredDeck);
  const { pairs, trips, quads, kickers } = getRanks(hand);

  let potentialTwoPairs = 0;

  if (trips.length > 0 || quads.length > 0) return potentialTwoPairs;

  if (hand.length === 0) {
    deckRankCounts.forEach((count, index) => {
      const pair1Coefficient =
        count === 4 ? 6 : count === 3 ? 3 : count === 2 ? 1 : 0;
      const removedPair1RankCounts = deckRankCounts.filter(
        (x, i) => i !== index
      );

      let pair2Combos = 0;
      removedPair1RankCounts.forEach((c, rank) => {
        const pair2Coefficient = c === 4 ? 6 : c === 3 ? 3 : c === 2 ? 1 : 0;
        const removedCardRankCounts = removedPair1RankCounts.filter(
          (x, i) => i !== rank
        );
        const combos = getComboProductSum(removedCardRankCounts, 1);
        pair2Combos += pair2Coefficient * combos;
      });

      // We divide by two because the order doesn't matter
      potentialTwoPairs += (pair1Coefficient * pair2Combos) / 2;
    });
  } else {
    if (hand.length === 1) {
      // Pair up kicker and 2 of the next 3 card OR 2 Pair from each of the next 4 cards
      const [kicker] = kickers;
      const kickerCoefficient = deckRankCounts[kicker];
      deckRankCounts[kicker] = 0;
      let pair1Combos = 0;
      let pair2Combos = 0;
      deckRankCounts.forEach((c, rank) => {
        const pair1Coefficient = c === 4 ? 6 : c === 3 ? 3 : c === 2 ? 1 : 0;
        const removedCardRankCounts = deckRankCounts.filter(
          (x, i) => i !== rank
        );
        const combos = getComboProductSum(removedCardRankCounts, 1);
        pair1Combos += pair1Coefficient * combos;

        removedCardRankCounts.forEach((p2count) => {
          const pair2Coefficient =
            p2count === 4 ? 6 : p2count === 3 ? 3 : p2count === 2 ? 1 : 0;
          pair2Combos += (pair1Coefficient * pair2Coefficient) / 2;
        });
      });

      const kicker2pairs = kickerCoefficient * pair1Combos;
      potentialTwoPairs += kicker2pairs + pair2Combos;
    } else if (hand.length === 2) {
      if (pairs.length === 1) {
        // Must get 2nd pair from 2 of next 3 cards
        const [pair] = pairs;
        deckRankCounts[pair] = 0;

        let pair2Combos = 0;
        deckRankCounts.forEach((count, rank) => {
          const pair2Coefficient =
            count === 4 ? 6 : count === 3 ? 3 : count === 2 ? 1 : 0;

          const removedCardRankCounts = deckRankCounts.filter(
            (x, i) => i !== rank
          );
          const combos = getComboProductSum(removedCardRankCounts, 1);
          pair2Combos += pair2Coefficient * combos;
        });

        potentialTwoPairs += pair2Combos;
      } else {
        // Must pair up each kicker OR 1 Kicker and last 2 cards
        const [kicker0, kicker1] = kickers;
        const kicker0Coefficient = deckRankCounts[kicker0];
        const kicker1Coefficient = deckRankCounts[kicker1];
        deckRankCounts[kicker0] = 0;
        deckRankCounts[kicker1] = 0;

        const combos = getComboProductSum(deckRankCounts, 1);

        let pair2Combos = 0;
        deckRankCounts.forEach((count) => {
          const pair2Coefficient =
            count === 4 ? 6 : count === 3 ? 3 : count === 2 ? 1 : 0;
          pair2Combos += pair2Coefficient;
        });

        const doubleKicker2pairs =
          kicker0Coefficient * kicker1Coefficient * combos;
        const kicker0TwoPairs = kicker0Coefficient * pair2Combos;
        const kicker1TwoPairs = kicker1Coefficient * pair2Combos;

        potentialTwoPairs +=
          doubleKicker2pairs + kicker0TwoPairs + kicker1TwoPairs;
      }
    } else if (hand.length === 3) {
      if (pairs.length === 1) {
        const [pair] = pairs;
        const [kicker] = kickers;
        const kickerCoefficient = deckRankCounts[kicker];
        deckRankCounts[pair] = 0;
        deckRankCounts[kicker] = 0;

        const combos = getComboProductSum(deckRankCounts, 1);
        const pairKickerPair = kickerCoefficient * combos;

        let pair2Combos = 0;
        deckRankCounts.forEach((count) => {
          const pair2Coefficient =
            count === 4 ? 6 : count === 3 ? 3 : count === 2 ? 1 : 0;
          pair2Combos += pair2Coefficient;
        });

        potentialTwoPairs += pairKickerPair + pair2Combos;
      } else if (kickers.length === 3) {
        // Must pair 2 of 3 kickers;
        const [kicker0, kicker1, kicker2] = kickers;
        const kicker0Coefficient = deckRankCounts[kicker0];
        const kicker1Coefficient = deckRankCounts[kicker1];
        const kicker2Coefficient = deckRankCounts[kicker2];

        const kicker0Kicker1 = kicker0Coefficient * kicker1Coefficient;
        const kicker0Kicker2 = kicker0Coefficient * kicker2Coefficient;
        const kicker1Kicker2 = kicker1Coefficient * kicker2Coefficient;

        potentialTwoPairs += kicker0Kicker1 + kicker0Kicker2 + kicker1Kicker2;
      }
    } else if (hand.length === 4) {
      if (pairs.length === 2) {
        // Must avoid Tripping up either pair
        const [pair0, pair1] = pairs;
        deckRankCounts[pair0] = 0;
        deckRankCounts[pair1] = 0;

        const combos = getComboProductSum(deckRankCounts, 1);
        potentialTwoPairs += combos;
        //
      } else if (pairs.length === 1) {
        // Must pair 1 of 2 kickers in next card.
        const [kicker0, kicker1] = kickers;
        const kicker0Coefficient = deckRankCounts[kicker0];
        const kicker1Coefficient = deckRankCounts[kicker1];

        potentialTwoPairs += kicker0Coefficient + kicker1Coefficient;
      }
    } else if (hand.length === 5) {
      if (pairs.length === 2) {
        potentialTwoPairs = 1;
      }
    }
  }

  return potentialTwoPairs;
};
