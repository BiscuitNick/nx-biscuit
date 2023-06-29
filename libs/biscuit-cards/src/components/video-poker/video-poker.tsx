import { useEffect, useState } from 'react';

import { PayTable } from './pay-table';
import { CardRow } from './card-row';

import './Poker.css';
import { PokerButton } from './poker-button';

import { shuffledDeck, shuffle } from '../../lib/deck';
import {
  getFlushValue,
  getRankValue,
  getStraightValue,
} from '../../lib/getPokerHand';

import { sleep } from '../blackjack/helpers';

export const VideoPoker = () => {
  const [deck, setDeck] = useState(shuffledDeck(1));
  const [status, setStatus] = useState('pendingNewGame');
  //   const [result, setResult] = useState('');

  const [credits, setCredits] = useState(200);
  const [bet, setBet] = useState(0);
  const [cards, setCards] = useState([-1, -1, -1, -1, -1]);
  const [holds, setHolds] = useState([false, false, false, false, false]);
  const [winningHand, setWinningHand] = useState('Royal Flush');

  const updateHolds = (index: number) => {
    if (status !== 'pendingDraw') return;

    const newHolds = [...holds];
    newHolds[index] = !newHolds[index];
    setHolds(newHolds);
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
    console.log(cardRanks, flushValue, straightValue);
  }, [cards]);

  return (
    <div
      style={{
        display: 'grid',
        gridGap: 20,
        width: 650,
        margin: 'auto',
        background: 'green',
        padding: 10,
        boxSizing: 'border-box',
      }}
    >
      <PayTable credits={bet} hand={winningHand} />
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
          {status}
        </div>
        <div className="border-text" style={{ textAlign: 'right' }}>
          CREDITS {credits}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <PokerButton handleClick={betOne} texts={['LOBBY']} />
        <PokerButton handleClick={betOne} texts={['BET', 'ONE']} />
        {cards.map((x, i) => (
          <PokerButton
            key={i}
            handleClick={() => updateHolds(i)}
            texts={['HOLD', '', 'CANCEL']}
          />
        ))}
        <PokerButton handleClick={betMax} texts={['MAX', 'BET']} />
        <PokerButton handleClick={dealOrDraw} texts={['DEAL', '', 'DRAW']} />
      </div>
    </div>
  );
};
