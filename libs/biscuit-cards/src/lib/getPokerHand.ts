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
    ? 100 + pairs[0]
    : Math.max(...kickers);
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
    if (num === 0) {
      counts[13] = 1;
    }
  });
  const straightStr = counts.join('');
  const straightIndex = straightStr.indexOf('11111');

  return straightIndex > 0 ? 400 + straightIndex : 0;
};

// 100 Pair

export const getHandValue = (hand: number[]) => {
  const rankVal = getRankValue(hand);
  const flushVal = getFlushValue(hand);
  const straightVal = getStraightValue(hand);
  const straightFlushVal =
    flushVal > 0 && straightVal > 0 ? 800 + (straightVal % 100) : 0;

  return Math.max(rankVal, flushVal, straightVal, straightFlushVal);
};
