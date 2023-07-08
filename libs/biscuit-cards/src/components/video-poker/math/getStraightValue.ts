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
