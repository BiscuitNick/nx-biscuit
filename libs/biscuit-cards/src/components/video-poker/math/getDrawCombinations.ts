// import { valueCounter } from '../constants';
// import { getHandValue } from './getHandValue';

import { valueCounter, getHandValue } from '@biscuitnick/math';

export const combinations = (arr: number[], k: number) => {
  const combs: number[][] = [];
  const recurse = (
    arr: number[],
    k: number,
    start: number,
    combo: number[]
  ) => {
    if (k === 0) {
      combs.push(combo);
    } else {
      for (let i = start; i <= arr.length - k; i++) {
        recurse(arr, k - 1, i + 1, [...combo, arr[i]]);
      }
    }
  };
  recurse(arr, k, 0, []);
  return combs;
};

const drawCombinations = (hand: number[], deck: number[], k: number) => {
  const combs: number[][] = [];
  const recurse = (
    deck: number[],
    k: number,
    start: number,
    combo: number[]
  ) => {
    if (k === 0) {
      combs.push([...hand, ...combo]);
    } else {
      for (let i = start; i <= deck.length - k; i++) {
        recurse(deck, k - 1, i + 1, [...combo, deck[i]]);
      }
    }
  };
  recurse(deck, k, 0, []);
  return combs;
};

export const drawCombinationValues = (hand: number[], deck: number[]) => {
  const draws = drawCombinations(hand, deck, 5 - hand.length);
  const counts = { ...valueCounter };

  draws.forEach((draw) => counts[getHandValue(draw)]++);

  const percents = { ...valueCounter };

  Object.keys(counts).forEach((key) => {
    percents[key] = (counts[key] / draws.length) * 100;
  });

  return { counts, percents };
};
