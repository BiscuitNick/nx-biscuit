export const getFlushValue = (hand: number[]) => {
  if (hand.includes(-1)) return 0;
  const counts = Array(4).fill(0);
  hand.forEach((num) => (counts[Math.floor(num / 13)] += 1));

  return Math.max(...counts) === 5 ? 500 : 0;
};
