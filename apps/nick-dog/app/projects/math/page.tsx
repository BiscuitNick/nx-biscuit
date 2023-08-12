'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { Card, CharCard, handValueTitles } from '@nx-biscuit/biscuit-cards';
import {
  getTotalCombinations,
  getDraws,
  drawCombinationValues,
} from '@biscuitnick/math';
const getNewDeck = () => [...Array(52).keys()];

export default function Home() {
  const [hand, setHand] = useState<number[]>([-1, -1, -1, -1, -1]);
  const [discards, setDiscards] = useState<number[]>([]);

  const [deck, setDeck] = useState<number[]>(getNewDeck());

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const [showDeck, setShowDeck] = useState<boolean>(true);

  const [allDraws, setAllDraws] = useState<any>({});
  const [calculatedDraws, setCalculatedDraws] = useState<any>({});

  // const discards: number[] = [8, 9, 23];

  async function calculateOdds() {
    // setCalculating(true);
    // const holdCards: number[] = [];
    // const muckCards: number[] = discards;
    const holdCards = hand.filter((c) => c > -1);

    // holds.forEach((h, i) => {
    //   if (h) {
    //     holdCards.push(cards[i]);
    //   } else {
    //     muckCards.push(cards[i]);
    //   }
    // });
    // const holdStr = hand.sort((a, b) => (a > b ? 1 : -1)).join(',');
    // const muckStr = ''; //muckCards.sort((a, b) => (a > b ? 1 : -1)).join(',');
    // const key = `${holdStr}-${muckStr}`;
    // console.log(key);
    const endpoint = '/api/poker';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ holdCards, discards }),
    };
    const response = await fetch(endpoint, options);
    const { counts: c, percents: p } = await response.json();
    // console.log(c);

    setAllDraws(c);
  }

  useEffect(() => {
    const holdCards = hand.filter((c) => c > -1);

    const draws = getDraws({ hand: holdCards, discards });
    setCalculatedDraws(draws);

    const filteredDeck = deck.filter(
      (c) => !holdCards.includes(c) && !discards.includes(c)
    );

    if (holdCards.length > 1) {
      const { counts } = drawCombinationValues(holdCards, filteredDeck);
      setAllDraws(counts);
    }
  }, [hand, discards]);

  // useEffect(() => {
  //   console.log(calculatedDraws);
  //   console.log(allDraws);
  // }, [calculatedDraws, allDraws]);

  //   // if (showOdds) {
  //   //   calculateOdds();
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hand]);

  // console.log(allDraws[100]);

  // console.log(allDraws);

  const totalPairs =
    allDraws[101] +
    allDraws[102] +
    allDraws[103] +
    allDraws[104] +
    allDraws[105] +
    allDraws[106] +
    allDraws[107] +
    allDraws[108] +
    allDraws[109] +
    allDraws[110] +
    allDraws[111] +
    allDraws[112] +
    allDraws[113];
  const totalHighPairs =
    allDraws[110] + allDraws[111] + allDraws[112] + allDraws[113];

  const handLength = hand.filter((c) => c > -1).length;
  const remainingCards = deck.length - handLength - discards.length;

  const totalCombinations = getTotalCombinations(
    remainingCards,
    5 - handLength
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        width: '100%',
        height: '100%',
        background: 'orange',
        justifyContent: 'space-around',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto '.repeat(13),
          gridTemplateColumns: 'auto '.repeat(4),
          gridGap: 1,
          background: 'black',
          padding: 5,
          margin: 'auto',
          height: '100%',
        }}
      >
        {showDeck &&
          deck.map((card, i) => {
            const col = Math.floor(i / 13) + 1;
            const row = (i % 13) + 1;

            return (
              <div
                key={i}
                style={{
                  width: 35,
                  height: 49,
                  gridRowStart: row,
                  gridRowEnd: row + 1,
                  gridColumnStart: col,
                  gridColumnEnd: col + 1,
                  // gridRow: `${row}/${row + 1}`,
                  // gridColumn: `${String(col)}/${String(col + 1)}`,
                  background: 'red',
                  // border: '1px solid black',
                }}
                onClick={() => {
                  const handCopy = [...hand];

                  if (handCopy.includes(i)) {
                    const cardIndex = hand.indexOf(i);
                    handCopy[cardIndex] = -1;
                    setHand(handCopy);
                    setSelectedIndex(-1);
                  } else if (selectedIndex > -1) {
                    handCopy[selectedIndex] = i;
                    setSelectedIndex(-1);
                    setHand(handCopy);
                  } else if (!discards.includes(card)) {
                    const muckCopy = [...discards];
                    muckCopy.push(i);
                    setDiscards(muckCopy);
                  } else if (discards.includes(card)) {
                    const muckCopy = discards.filter((c) => c !== card);
                    setDiscards(muckCopy);
                  }

                  // if (handCopy[selectedIndex] === -1) {
                  //   handCopy[selectedIndex] = card;
                  //   setHand(handCopy);
                  //   setSelectedIndex(-1);
                  //   // setShowDeck(false);
                  // }
                }}
              >
                <Card
                  raw={
                    hand.includes(card) || discards.includes(card) ? -1 : card
                  }
                />
              </div>
            );
          })}
      </div>
      <div
        style={{
          margin: 'auto',
          display: 'grid',
          height: '100%',
          gridGap: 10,
          gridTemplateRows: 'auto 1fr auto',
        }}
      >
        <div>
          <h3>Hand</h3>
          <div style={{ display: 'grid', gridAutoFlow: 'column', width: 300 }}>
            {hand.map((card, i) => (
              <div
                key={i}
                style={{
                  width: 50,
                  height: 70,
                  background: 'red',

                  border: selectedIndex === i ? 'solid 2px limegreen' : 'none',
                }}
                onClick={() => {
                  const handCopy = [...hand];
                  if (handCopy[i] === -1) {
                    setSelectedIndex(i);
                    // setShowDeck(true);
                  } else {
                    handCopy[i] = -1;
                    setSelectedIndex(i);
                    setHand(handCopy);
                  }
                }}
              >
                <Card raw={card} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Discards</h3>
          <div
            style={{ display: 'flex', flexWrap: 'wrap', width: 500, gap: 5 }}
          >
            {discards.map((card, i) => (
              <div
                key={i}
                style={{
                  width: 50,
                  height: 70,
                  background: 'red',
                }}
                onClick={() => {
                  // Remove from discards

                  const discardsCopy = discards.filter((c) => c !== card);
                  setDiscards(discardsCopy);

                  // const handCopy = [...hand];
                  // if (handCopy[i] === -1) {
                  //   setSelectedIndex(i);
                  //   // setShowDeck(true);
                  // } else {
                  //   handCopy[i] = -1;
                  //   setSelectedIndex(i);
                  //   setHand(handCopy);
                  // }
                }}
              >
                <Card raw={card} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'auto auto auto' }}
          >
            {Object.keys(allDraws).map((val, i) => (
              <Fragment key={i}>
                <div>{val}</div>
                <div>{allDraws[val] ? allDraws[val] : 0}</div>
                <div>{calculatedDraws[val]}</div>
              </Fragment>
            ))}
          </div>
          <div>
            Remaining Cards: <span>{remainingCards}</span>
          </div>
          <div>
            Total Combinations: <span>{totalCombinations}</span>
          </div>
          <div>
            Total Pairs: <span>{!isNaN(totalPairs) ? totalPairs : ''}</span>
          </div>
          <div>
            High Pairs:
            <span>{!isNaN(totalHighPairs) ? totalHighPairs : ''}</span>
          </div>
          <button onClick={calculateOdds}>Calculate Odds</button>
        </div>
      </div>
    </div>
  );
}
