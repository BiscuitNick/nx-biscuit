import { NextResponse } from 'next/server';
// import { getDeck } from '@nx-biscuit/biscuit-cards';
interface valueCounts {
  [key: string]: number;
}
const valueCounter: valueCounts = {
  900: 0,
  800: 0,
  700: 0,
  600: 0,
  500: 0,
  400: 0,
  300: 0,
  200: 0,
  110: 0,
  100: 0,
  0: 0,
};
const getFlushValue = (hand: number[]) => {
  if (hand.includes(-1)) return 0;
  const counts = Array(4).fill(0);
  hand.forEach((num) => (counts[Math.floor(num / 13)] += 1));

  return Math.max(...counts) === 5 ? 500 : 0;
};
const getRankValue = (hand: number[]) => {
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
const getStraightValue = (hand: number[]) => {
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
const getHandValue = (hand: number[]) => {
  const rankVal = getRankValue(hand);
  const flushVal = getFlushValue(hand);
  const straightVal = getStraightValue(hand);
  const straightFlushVal =
    flushVal > 0 && straightVal > 0 ? (straightVal === 409 ? 900 : 800) : 0;
  const handVal = Math.max(rankVal, flushVal, straightVal, straightFlushVal);

  return handVal - (handVal % 10);
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
const drawCombinationValues = (hand: number[], deck: number[]) => {
  const draws = drawCombinations(hand, deck, 5 - hand.length);
  const counts = { ...valueCounter };

  draws.forEach((draw) => counts[getHandValue(draw)]++);

  const percents = { ...valueCounter };

  Object.keys(counts).forEach((key) => {
    percents[key] = counts[key] / draws.length;
  });

  return { counts, percents };
};

export async function GET(request: Request) {
  // console.log(request);
  // const { url } = request;
  // const { searchParams } = new URL(url);

  // console.log(searchParams);

  return NextResponse.json('This api method only accepts POST requests.');
}

export async function POST(request: Request) {
  const { holdCards, muckCards } = await request.json();
  const deck = [...Array(52).keys()].filter(
    (raw) => !holdCards.includes(raw) && !muckCards.includes(raw)
  );
  const { counts, percents } = drawCombinationValues(holdCards, deck);

  return NextResponse.json({ counts, percents });
}
