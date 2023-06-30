import { useEffect, useState } from 'react';
import { PayTable } from './pay-table';
import { CardRow } from './card-row';
import { PokerButton } from './poker-button';
import { payouts96 } from './constants';
import { shuffledDeck, shuffle } from '../../lib/deck';
import {
  getFlushValue,
  getRankValue,
  getStraightValue,
  getHandValue,
  getHandTitle,
  combinations,
  drawCombinationValues,
} from '../../lib/getPokerHand';

import { BottomButtons } from './bottom-buttons';

import { sleep } from '../blackjack/helpers';

import './Poker.css';

export const VideoPoker = () => {
  const [deck, setDeck] = useState(shuffledDeck(1));
  const [status, setStatus] = useState('pendingNewGame');
  const [payouts, setPayouts] = useState(payouts96);
  const [showOdds, setShowOdds] = useState(false);

  const [credits, setCredits] = useState(200);
  const [bet, setBet] = useState(0);
  const [cards, setCards] = useState([0, 1, 2, 3, 4]);
  const [holds, setHolds] = useState([false, false, false, false, false]);
  const [winningHand, setWinningHand] = useState('Royal Flush');

  const [calculating, setCalculating] = useState(false);

  const updateHolds = (index: number) => {
    if (status !== 'pendingDraw') return;

    const newHolds = [...holds];
    newHolds[index] = !newHolds[index];
    setHolds(newHolds);
  };

  const minusBet = () => {
    const newBet = bet - 1 >= 0 ? bet - 1 : 0;
    const diff = bet - newBet;
    const newCredits = credits + diff;

    setBet(newBet);
    setCredits(newCredits);
  };

  const betOne = () => {
    const newBet = bet + 1 > 5 ? 1 : bet + 1;
    const diff = bet - newBet;
    const newCredits = credits + diff;

    setBet(newBet);
    setCredits(newCredits);
  };

  const betMax = () => {
    setBet(5);
  };

  const dealOrDraw = () => {
    if (status === 'pendingNewGame') {
      setStatus('dealingCards');
    } else if (status === 'pendingDraw') {
      setStatus('dealingDraw');
    }
  };

  useEffect(() => {
    async function dealNewGame() {
      const newDeck = shuffle(deck);
      setCards(newDeck.slice(0, 5));
      setHolds([false, false, false, false, false]);
      setDeck(newDeck);

      await sleep(1000);
      setStatus('pendingDraw');
    }
    async function dealDraw() {
      const hand = [...cards];
      let drawIndex = 5;

      holds.forEach((h, i) => {
        if (!h) {
          hand[i] = deck[drawIndex];
          drawIndex++;
        }
      });

      await sleep(1000);
      setCards(hand);
      setStatus('pendingNewGame');
    }
    if (status === 'dealingCards') {
      dealNewGame();
    } else if (status === 'dealingDraw') {
      dealDraw();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const cardRanks = getRankValue(cards);
    const flushValue = getFlushValue(cards);
    const straightValue = getStraightValue(cards);
    const handValue = getHandValue(cards);
    const handTitle = getHandTitle(cards);
    console.log(cardRanks, flushValue, straightValue, handValue, handTitle);

    // const remainingDeck = [...deck].filter((card) => !cards.includes(card));
    // const drawDeck = [...deck].slice(5);

    // console.log(deck);
    // console.log(remainingDeck);
    // console.log(drawDeck);

    // const combos4 = combinations(drawDeck, 4);
    // const combos4 = combinations(deck, 4);
    // const combos3 = combinations(deck, 3);
    // const combos2 = combinations(deck, 2);
    // const combos1 = combinations(deck, 1);

    // console.log(combos4);

    // console.log(combos5);
    // console.log(combos4);
    // console.log(combos3);
    // console.log(combos2);
    // console.log(combos1);

    console.log(handValue, handTitle);

    setWinningHand(handTitle);
  }, [cards]);

  useEffect(() => {
    async function getDraws() {
      setCalculating(true);
      const draws = await drawCombinationValues(heldCards, drawDeck);

      await sleep(1000);

      console.log(draws);
      setCalculating(false);
    }

    const heldCards = holds
      .map((h, i) => (h ? cards[i] : -1))
      .filter((c) => c !== -1);
    // console.log(heldCards);
    const drawDeck = [...deck].slice(5);

    if (heldCards.length > 0) {
      getDraws();
    }
  }, [holds]);

  console.log(calculating);

  return (
    <div
      style={{
        display: 'grid',
        gridGap: 20,
        width: 650,
        margin: 'auto',
        background: 'blue',
        padding: 10,
        boxSizing: 'border-box',
      }}
    >
      <PayTable
        credits={bet}
        hand={winningHand}
        payouts={payouts}
        showOdds={showOdds}
      />
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          // justifyContent: 'space-between',
          width: '100%',

          // background: 'purple',
        }}
      >
        <div className="border-text" style={{ margin: 'auto' }}>
          {winningHand.toUpperCase()}
        </div>
      </div>
      <CardRow
        cards={cards}
        holds={holds}
        updateHolds={updateHolds}
        status={status}
      />
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          justifyContent: 'space-between',
          width: '100%',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: 5,
        }}
      >
        <div className="border-text">BET {bet}</div>
        <div className="border-text" style={{ textAlign: 'center' }}>
          {calculating ? 'calculating odd...' : ''}
        </div>
        <div className="border-text" style={{ textAlign: 'right' }}>
          CREDITS {credits}
        </div>
      </div>

      <BottomButtons
        status={status}
        minusBet={minusBet}
        betOne={betOne}
        betMax={betMax}
        dealOrDraw={dealOrDraw}
        toggleOdds={() => setShowOdds(!showOdds)}
      />
    </div>
  );
};
