import { valueCounter } from '../components/video-poker/constants';
import { sleep } from '../components/blackjack/helpers';

export const getRanks = (hand: number[]) =>
  hand.map((x) => (x % 13 === 0 ? 14 : (x % 13) + 1));

export const getRankValue = (hand: number[]) => {
  if (hand.includes(-1)) return 0;

  const counts = Array(13).fill(0);
  hand.forEach((num) => (counts[num % 13] += 1));

  const kickers: number[] = [];
  const pairs: number[] = [];
  const trips: number[] = [];
  const quads: number[] = [];

  counts.forEach((count, i) => {
    const rank = i === 0 ? 13 : i;
    if (count === 1) {
      kickers.push(rank);
    } else if (count === 2) {
      pairs.push(rank);
    } else if (count === 3) {
      trips.push(rank);
    } else if (count === 4) {
      quads.push(rank);
    }
  });

  return quads.length === 1
    ? 700
    : trips.length === 1 && pairs.length === 1
    ? 600
    : trips.length === 1
    ? 300
    : pairs.length === 2
    ? 200
    : pairs.length === 1
    ? pairs[0] >= 10
      ? 110
      : 100
    : 0;
};

export const getFlushValue = (hand: number[]) => {
  if (hand.includes(-1)) return 0;
  const counts = Array(4).fill(0);
  hand.forEach((num) => (counts[Math.floor(num / 13)] += 1));

  return Math.max(...counts) === 5 ? 500 : 0;
};

export const getStraightValue = (hand: number[]) => {
  const counts = Array(14).fill(0);
  hand.forEach((num) => {
    counts[num % 13] = 1;
    if (num % 13 === 0) {
      counts[13] = 1;
    }
  });
  const straightStr = counts.join('');
  const straightIndex = straightStr.indexOf('11111');

  return straightIndex >= 0 ? 400 + straightIndex : 0;
};

// 100 Pair

export const getHandValue = (hand: number[]) => {
  const rankVal = getRankValue(hand);
  const flushVal = getFlushValue(hand);
  const straightVal = getStraightValue(hand);
  const straightFlushVal =
    flushVal > 0 && straightVal > 0 ? (straightVal === 409 ? 900 : 800) : 0;
  const handVal = Math.max(rankVal, flushVal, straightVal, straightFlushVal);

  return handVal - (handVal % 10);
};

export const getHandTitle = (hand: number[]) => {
  const handValue = getHandValue(hand);
  return handValue === 900
    ? 'Royal Flush'
    : handValue >= 800
    ? 'Straight Flush'
    : handValue >= 700
    ? 'Four of a Kind'
    : handValue >= 600
    ? 'Full House'
    : handValue >= 500
    ? 'Flush'
    : handValue >= 400
    ? 'Straight'
    : handValue >= 300
    ? 'Three of a Kind'
    : handValue >= 200
    ? 'Two Pair'
    : handValue === 110
    ? 'Jacks or Better'
    : handValue >= 100
    ? 'Low Pair'
    : 'High Card';
};

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

function drawCombinations(hand: number[], deck: number[], k: number) {
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
}

export async function drawCombinationValues(hand: number[], deck: number[]) {
  const draws = drawCombinations(hand, deck, 5 - hand.length);
  const counts = { ...valueCounter };

  draws.forEach((draw) => counts[getHandValue(draw)]++);

  const percents = { ...valueCounter };

  Object.keys(counts).forEach((key) => {
    percents[key] = (counts[key] / draws.length) * 100;
  });

  return new Promise((resolve) => {
    resolve({ counts, percents });
  });
}
