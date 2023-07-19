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
