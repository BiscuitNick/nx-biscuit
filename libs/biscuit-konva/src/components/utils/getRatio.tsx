export interface getRatioParams {
  ratio: number;
  sum: number;
}

const getRatio = (params: getRatioParams) => {
  const { ratio, sum } = params;
  const a = (ratio * sum) / (ratio + 1);
  const b = sum / (ratio + 1);
  return [a, b];
};

export default getRatio;
