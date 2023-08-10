export const getTotalCombinations = (n: number, r: number) => {
  let top = 1;
  const bottomFactor = Math.max(n - r, r);
  const bottomFactorial = n - bottomFactor;

  for (let i = n; i > bottomFactor; i--) {
    top *= i;
  }

  for (let i = bottomFactorial; i > 1; i--) {
    top /= i;
  }

  return top;
};
