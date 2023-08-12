import {
  standardDeck,
  getFilteredDeck,
  getRankCounts,
  getRanks,
} from '../deck';
import { getComboProductSum } from '../getDrawCombinations';
import { getDrawsProps } from './getDrawValue';

export const getPairDraws = (props: getDrawsProps) => {
  const { hand = [], discards = [], deck = standardDeck } = props;
  const filteredDeck = getFilteredDeck({ hand, discards, deck });
  const deckRankCounts = getRankCounts(filteredDeck);
  const { pairs, trips, kickers } = getRanks(hand);
  const potentialPairs = new Array(13).fill(0);
  let totalPotentialPairs = 0;

  if (hand.length === 0) {
    deckRankCounts.forEach((count, index) => {
      const comboCoefficient =
        count === 4 ? 6 : count === 3 ? 3 : count === 2 ? 1 : 0;
      const removedCardRankCounts = deckRankCounts.filter(
        (x, i) => i !== index
      );
      const combos = getComboProductSum(removedCardRankCounts, 3);
      const potentials = comboCoefficient * combos;
      potentialPairs[index] = potentials;
      totalPotentialPairs += potentials;
    });
  } else {
    if (hand.length === 1) {
      const [kicker] = kickers;
      const kickerCoefficient = deckRankCounts[kicker];

      deckRankCounts[kicker] = 0;

      const kickerPairCombos = getComboProductSum(deckRankCounts, 3);
      const kickerPairs = kickerCoefficient * kickerPairCombos;

      potentialPairs[kicker] = kickerPairs;

      deckRankCounts.forEach((count, index) => {
        if (index === kicker) return;
        const comboCoefficient =
          count === 4 ? 6 : count === 3 ? 3 : count === 2 ? 1 : 0;
        const removedCardRankCounts = deckRankCounts.filter(
          (x, i) => i !== index
        );
        const combos = getComboProductSum(removedCardRankCounts, 2);
        const potentials = comboCoefficient * combos;

        potentialPairs[index] = potentials;
        totalPotentialPairs += potentials;
      });
    } else if (hand.length === 2) {
      if (pairs.length === 1) {
        // Must avoid improving on pair (2 Pair, Trips, Full House, Quads)
        const [pair] = pairs;
        deckRankCounts[pair] = 0;
        const combos = getComboProductSum(deckRankCounts, 3);

        potentialPairs[pair] = combos;
        totalPotentialPairs += combos;
      } else {
        // Must pair up 1 of 2 kickers OR pair up 2 of next 3 cards, and avoid improving beyond pair
        const [kicker0, kicker1] = kickers;

        const kicker0Coefficient = deckRankCounts[kicker0];
        const kicker1Coefficient = deckRankCounts[kicker1];

        deckRankCounts[kicker0] = 0;
        deckRankCounts[kicker1] = 0;

        const combos = getComboProductSum(deckRankCounts, 2);
        const kicker0Pairs = kicker0Coefficient * combos;
        const kicker1Pairs = kicker1Coefficient * combos;

        potentialPairs[kicker0] = kicker0Pairs;
        potentialPairs[kicker1] = kicker1Pairs;
        totalPotentialPairs += kicker0Pairs + kicker1Pairs;

        deckRankCounts.forEach((count, index) => {
          if (index === kicker0 || index === kicker1) return;
          const comboCoefficient =
            count === 4 ? 6 : count === 3 ? 3 : count === 2 ? 1 : 0;
          const removedCardRankCounts = deckRankCounts.filter(
            (x, i) => i !== index
          );
          const combos = getComboProductSum(removedCardRankCounts, 1);
          const potentials = comboCoefficient * combos;

          potentialPairs[index] = potentials;
          totalPotentialPairs += potentials;
        });
      }
    } else if (hand.length === 3) {
      // Can only have pair in hands with single pair, or 3 kickers (No Trips)
      if (pairs.length === 1) {
        // Must avoid improving on pair
        const [pair] = pairs;
        const [kicker0] = kickers;

        deckRankCounts[pair] = 0;
        deckRankCounts[kicker0] = 0;

        const combos = getComboProductSum(deckRankCounts, 2);

        potentialPairs[pair] = combos;
        totalPotentialPairs += combos;
      } else if (kickers.length === 3) {
        // Must pair up 1 of 3 kickers, or pair last 2 cards, and avoid improving beyond pair
        const [kicker0, kicker1, kicker2] = kickers;

        const kicker0Coefficient = deckRankCounts[kicker0];
        const kicker1Coefficient = deckRankCounts[kicker1];
        const kicker2Coefficient = deckRankCounts[kicker2];

        deckRankCounts[kicker0] = 0;
        deckRankCounts[kicker1] = 0;
        deckRankCounts[kicker2] = 0;

        const combos = getComboProductSum(deckRankCounts, 1);
        const kicker0Pairs = kicker0Coefficient * combos;
        const kicker1Pairs = kicker1Coefficient * combos;
        const kicker2Pairs = kicker2Coefficient * combos;

        potentialPairs[kicker0] = kicker0Pairs;
        potentialPairs[kicker1] = kicker1Pairs;
        potentialPairs[kicker2] = kicker2Pairs;

        totalPotentialPairs += kicker0Pairs + kicker1Pairs + kicker2Pairs;

        deckRankCounts.forEach((count, index) => {
          if (kickers.includes(index)) return;
          const comboCoefficient =
            count === 4 ? 6 : count === 3 ? 3 : count === 2 ? 1 : 0;
          potentialPairs[index] = comboCoefficient;
          totalPotentialPairs += comboCoefficient;
        });
      }
    } else if (hand.length === 4) {
      // Can only have single pair in hands with 1 pair, or 4 kickers. (No Trips, 2 Pair, or Quad)
      if (pairs.length === 1) {
        const [pair] = pairs;
        const [kicker0, kicker1] = kickers;

        deckRankCounts[pair] = 0;
        deckRankCounts[kicker0] = 0;
        deckRankCounts[kicker1] = 0;

        const combos = getComboProductSum(deckRankCounts, 1);

        potentialPairs[pair] = combos;
        totalPotentialPairs += combos;
      } else if (kickers.length === 4) {
        // Must pair 1 of 4 kickers on next card
        const [kicker0, kicker1, kicker2, kicker3] = kickers;

        const kicker0Pairs = deckRankCounts[kicker0];
        const kicker1Pairs = deckRankCounts[kicker1];
        const kicker2Pairs = deckRankCounts[kicker2];
        const kicker3Pairs = deckRankCounts[kicker3];

        potentialPairs[kicker0] = kicker0Pairs;
        potentialPairs[kicker1] = kicker1Pairs;
        potentialPairs[kicker2] = kicker2Pairs;
        potentialPairs[kicker3] = kicker3Pairs;

        totalPotentialPairs +=
          kicker0Pairs + kicker1Pairs + kicker2Pairs + kicker3Pairs;
      }
    } else if (hand.length === 5) {
      // Must be 1 pair hand
      if (pairs.length === 1 && trips.length === 0) {
        const [pair] = pairs;
        potentialPairs[pair] = 1;
        totalPotentialPairs += 1;
      }
    }
  }

  const lowPairs = potentialPairs.slice(1, 10).reduce((a, b) => a + b, 0);
  const highPairs = [potentialPairs[0], ...potentialPairs.slice(10)].reduce(
    (a, b) => a + b,
    0
  );

  return { totalPotentialPairs, lowPairs, highPairs, potentialPairs };
};
