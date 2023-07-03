'use client';

import { MathJax } from 'better-react-mathjax';

interface MathJaxProps {
  inline?: boolean;
}

interface CombinationProps {
  n: number;
  r: number;
  inline?: boolean;
}

export const CombinationFormula = ({ inline }: MathJaxProps) => (
  <div className="pointer-events-none">
    <MathJax
      inline={inline}
    >{`\\(\\binom{n}{r} = \\frac{n!}{(n-r)!r!} \\)`}</MathJax>
  </div>
);

export const CombinationEquation = ({ n, r }: CombinationProps) => (
  <div className="pointer-events-none">
    <MathJax>{`\\(\\binom{${n}}{${r}} = \\frac{${n}!}{(${n}-${r})!${r}!} \\)`}</MathJax>
  </div>
);

export const CombinationStep1 = ({ n, r }: CombinationProps) => (
  <div className="pointer-events-none">
    <MathJax>{`\\(\\binom{${n}}{${r}} = \\frac{${n}!}{${
      n - r
    }!${r}!} \\)`}</MathJax>
  </div>
);

export const CombinationStep2 = ({ n, r }: CombinationProps) => {
  const factorialTop = [];
  const factorialBottom = [];

  for (let i = 0; i < r; i++) {
    factorialTop.push(n - i);
    factorialBottom.push(r - i);
  }

  return (
    <div className="pointer-events-none">
      <MathJax>{`\\(\\binom{${n}}{${r}} = \\frac{${factorialTop
        .map((num, i) => `${num}`)
        .join('*')}}{${factorialBottom
        .map((num) => `${num}`)
        .join('*')}} \\)`}</MathJax>
    </div>
  );
};

export const CombinationStep3 = ({ n, r }: CombinationProps) => {
  const factorialTop = [];
  const factorialBottom = [];

  for (let i = 0; i < r; i++) {
    factorialTop.push(n - i);
    factorialBottom.push(r - i);
  }

  const topProduct = factorialTop.reduce((acc, num) => acc * num, 1);
  const bottomProduct = factorialBottom.reduce((acc, num) => acc * num, 1);

  return (
    <div className="pointer-events-none">
      <MathJax>{`\\(\\binom{${n}}{${r}} = \\frac{${topProduct}}{${bottomProduct}} \\)`}</MathJax>
    </div>
  );
};

export const CombinationStep4 = ({ n, r }: CombinationProps) => {
  const factorialTop = [];
  const factorialBottom = [];

  for (let i = 0; i < r; i++) {
    factorialTop.push(n - i);
    factorialBottom.push(r - i);
  }

  const topProduct = factorialTop.reduce((acc, num) => acc * num, 1);
  const bottomProduct = factorialBottom.reduce((acc, num) => acc * num, 1);

  return (
    <div className="pointer-events-none">
      <MathJax>{`\\(\\binom{${n}}{${r}} = \\ ${
        topProduct / bottomProduct
      } \\)`}</MathJax>
    </div>
  );
};
