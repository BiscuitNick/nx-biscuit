// 'use client';
// import React, { useState, useEffect, Fragment } from 'react';
// import { Card } from '@nx-biscuit/biscuit-cards'; //CharCard, handValueTitles
import { drawCombinations, getMaxEvDraws } from '@biscuitnick/math';
const getNewDeck = () => [...Array(52).keys()];

export default function Home() {
  // const [allHands, setAllHands] = useState<number[][]>([]);
  // const [totalEv, setTotalEv] = useState<number>(0);

  // useEffect(() => {
  const deck = getNewDeck();
  const hands = drawCombinations([], deck, 5);
  // setAllHands(hands);
  // }, []);

  // useEffect(() => {
  // let evSum = 0;

  console.log(hands.length);

  // hands.forEach((hand, i) => {
  //   // if (i % 1000 === 0) {
  //   //   console.log(i, evSum);
  //   // }
  //   console.log(i, evSum);

  //   const { ev } = getMaxEvDraws({
  //     hand,
  //     payouts: {
  //       900: 800,
  //       800: 50,
  //       700: 25,
  //       600: 9,
  //       500: 6,
  //       400: 4,
  //       300: 3,
  //       200: 2,
  //       110: 1,
  //       100: 0,
  //       0: 0,
  //     },
  //   });
  //   evSum += ev;
  // });
  // setTotalEv(evSum);
  // }, [allHands]);

  return (
    <div>
      <div>{hands.length}</div>
      {hands.length > 0 ? <div>{hands[0]}</div> : null}
      {/* <div>{evSum}</div> */}
    </div>
  );
}
