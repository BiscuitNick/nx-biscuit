'use client';
import { useEffect, useState } from 'react';

// TODO: move to
import { shuffledDeck, shuffle } from '../../../lib/deck';
import { getHandTitle, getHandValue } from '../math';
import { payouts96, valueCounts, valueCounter } from '../constants';
// import { payouts96, valueCounts, valueCounter } from 'libs/math/src/poker/constants';
import { sleep } from '../../blackjack/helpers';
import { handValues, handValueTitles } from '../constants';

import { useVideoPokerDimensions } from './use-video-poker-dimensions';
import { getDraws, getMaxEvDraws } from '@biscuitnick/math';
interface useVideoPokerProps {
  initBet?: number;
  initCredits?: number;
  initStatus?: string;
  initCards?: number[];
  initHolds?: boolean[];
  initShowOdds?: boolean;

  width?: number;
  height?: number;
}

export const useVideoPoker = (props: useVideoPokerProps) => {
  const {
    initBet = 5,
    initCredits = 1000,
    initStatus = 'pendingNewGame',
    initCards = [-1, -1, -1, -1, -1],
    initHolds = [false, false, false, false, false],
    initShowOdds = true,
    width = 500,
    height = 500,
  } = props;
  const [deck, setDeck] = useState<number[]>(shuffledDeck(1));
  const [status, setStatus] = useState<string>(initStatus);
  const [showOdds, setShowOdds] = useState<boolean>(initShowOdds);
  const [bet, setBet] = useState<number>(initBet);
  const [credits, setCredits] = useState<number>(initCredits);
  const [cards, setCards] = useState<number[]>(initCards);
  const [holds, setHolds] = useState<boolean[]>(initHolds);
  const [winningHand, setWinningHand] = useState<string>('High Card');
  const [calculatingOdds, setCalculating] = useState<boolean>(false);

  const [percents, setPercents] = useState<valueCounts>({ ...valueCounter }); //setPercents
  const [counts, setCounts] = useState<valueCounts>({ ...valueCounter }); //setCounts
  const [expectedValues, setExpectedValues] = useState<valueCounts>({
    ...valueCounter,
  }); //setExpectedValues
  const [ev, setEV] = useState<number>(0);

  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const autoPlaySpeed = 1000;

  const [optimalHolds, setOptimalHolds] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [winnings, setWinnings] = useState<number>(0);

  const [totalGames, setTotalGames] = useState(0);

  const [maxGames, setMaxGames] = useState(1000);

  const [isTracking, setIsTracking] = useState(true);

  const [totalBets, setTotalBets] = useState<number>(0);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [handHistory, setHandHistory] = useState<valueCounts>({
    ...valueCounter,
  });
  const handTitles = handValues.map((val: string) => handValueTitles[val]);
  const payouts = payouts96;

  const { handStatusBar, betCreditStatusBar, paySchedule } =
    useVideoPokerDimensions({
      width,
      height,
      handTitles,
      payouts,
      bet,
      // winningHand,
      expectedValues,
      handValues,
      ev,
      percents,
      counts,
    });

  const [focalPoint, setFocalPoint] = useState({ x: 0, y: 0 });

  // const [handTitles] = useState<string[]>(
  //   handValues.map((val: string) => handValueTitles[val])
  // );

  // TODO allow other payouts

  const updateHolds = (index: number) => {
    if (status !== 'pendingDraw' && status !== 'pendingHolds') return;
    const newHolds = [...holds];
    newHolds[index] = !newHolds[index];
    setHolds(newHolds);
  };

  const minusBet = () => {
    const newBet = bet - 1 >= 1 ? bet - 1 : 1;
    const diff = bet - newBet;
    const newCredits = credits + diff;

    setBet(newBet);
    setCredits(newCredits);
  };

  const betOne = () => {
    const newBet = bet + 1 > 5 ? bet : bet + 1;
    const diff = bet - newBet;
    const newCredits = credits + diff;

    setBet(newBet);
    setCredits(newCredits);
  };

  const betMax = () => {
    const newBet = 5;
    const diff = bet - 5;
    const newCredits = credits + diff;

    setBet(newBet);
    setCredits(newCredits);
  };

  const dealOrDraw = () => {
    if (status === 'pendingNewGame') {
      // console.log('');
      setStatus('dealingCards');
      const newCredits = credits - bet;

      setTotalBets(totalBets + bet);
      setCredits(newCredits);
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

      await sleep(1000); //200 // 1000

      setStatus('pendingHolds');

      // setStatus('pendingDraw');
    }

    async function dealDraw() {
      if (autoPlay) {
        sleep(autoPlaySpeed); //200 // 2000
      }

      const hand = [...cards];

      let drawIndex = 0;

      const shuffledDeck = [...deck.sort(() => Math.random() - 0.5)].filter(
        (card) => !hand.includes(card)
      );

      holds.forEach((h, i) => {
        if (!h) {
          hand[i] = shuffledDeck[drawIndex];
          drawIndex++;
        }
      });

      await sleep(autoPlaySpeed); //100 // 500
      setCards(hand);
      await sleep(autoPlaySpeed); // 500
      setStatus('pendingPayouts');
    }

    async function payoutWinnings() {
      const newCredits = credits + winnings;
      const hValue = getHandValue(cards);

      // console.log(handHistory[hValue] + 1);

      const historyCopy = { ...handHistory };
      historyCopy[hValue] += 1;

      await sleep(autoPlaySpeed); //2000

      const newTotal = totalGames + 1;

      if (newTotal >= maxGames) {
        setAutoPlay(false);
      }

      setCredits(newCredits);
      setTotalGames(newTotal);
      setTotalWinnings(totalWinnings + winnings);
      setHandHistory(historyCopy);
      setStatus('pendingNewGame');
    }

    async function autoDealNextGame() {
      await sleep(autoPlaySpeed); // 1000
      dealOrDraw();
      // setStatus('pendingNewGame');
    }

    if (status === 'pendingNewGame') {
      if (autoPlay) autoDealNextGame();
    } else if (status === 'dealingCards') {
      dealNewGame();
    } else if (status === 'pendingHolds') {
      //
    } else if (status === 'pendingDraw') {
      setStatus('dealingDraw');
      //
    } else if (status === 'dealingDraw') {
      dealDraw();
    } else if (status === 'pendingPayouts') {
      payoutWinnings();
    } else {
      // console.log(149, status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const handTitle = getHandTitle(cards);
    const hValue = getHandValue(cards);

    const winnings = payouts[hValue][bet - 1];

    setWinningHand(handTitle);
    setWinnings(winnings);
  }, [bet, cards, payouts]);

  useEffect(() => {
    if (cards.includes(-1)) return;

    const hand: number[] = [];
    const discards: number[] = [];

    holds.forEach((h, i) => {
      if (h) {
        hand.push(cards[i]);
      } else {
        discards.push(cards[i]);
      }
    });

    const { percents, counts } = getDraws({ hand, discards });

    const evs: valueCounts = valueCounter;
    let netEv = 0;
    Object.keys(percents).forEach((key) => {
      const payrate = payouts[key][bet - 1];
      const ev = payrate * percents[key];
      netEv += ev;
      evs[key] = ev;
    });

    setPercents(percents);
    setCounts(counts);
    setExpectedValues(evs);
    setEV(netEv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holds]);

  useEffect(() => {
    const hand: number[] = cards.filter((c) => c > -1);

    if (hand.length === 5) {
      if (status === 'pendingHolds') {
        const { holds: optimals } = getMaxEvDraws({ hand: cards });

        setOptimalHolds(optimals);
        if (autoPlay) {
          setStatus('autoSetHolds');
          // setHolds(optimals);
        }
      } else if (status === 'dealingCards') {
        const resetHolds = [false, false, false, false, false];
        setOptimalHolds(resetHolds);
        setHolds(resetHolds);
      }
    }
  }, [cards, status, autoPlay]);

  useEffect(() => {
    async function setNextHold() {
      const unMatchedHolds = holds
        .map((h, i) => (h !== optimalHolds[i] ? i : -1))
        .filter((i) => i > -1);
      // console.log(unMatchedHolds);

      if (unMatchedHolds.length === 0) {
        // await sleep(500); //100 // 1000

        // const cardIndex = holds.indexOf(false);
        // setFocalPoint({
        //   x: (cardIndex * width) / 5,
        //   y: height * 0.75,
        // });
        setFocalPoint({ x: width, y: height });
        await sleep(autoPlaySpeed); //100 // 1000

        setIsTracking(false);

        await sleep(autoPlaySpeed); //100 // 1000

        setStatus('pendingDraw');
      } else {
        setIsTracking(true);

        const cardIndex = unMatchedHolds[0];
        setFocalPoint({ x: (cardIndex * width) / 5, y: height * 0.75 });

        await sleep(autoPlaySpeed); //100 // 1000

        const newHolds = [...holds];
        newHolds[cardIndex] = optimalHolds[cardIndex];

        setHolds(newHolds);
      }
    }

    if (status === 'autoSetHolds') {
      setNextHold();

      // console.log(holds, optimalHolds);

      // const allHoldsSet = holds.every((h, i) => h === optimalHolds[i]);

      // if (allHoldsSet) {
      //   setStatus('pendingDraw');
      // } else {
      //   setNextHold();
      // }
    }
  }, [autoPlay, status, optimalHolds, holds]);

  useEffect(() => {
    // console.log(
    //   handHistory,
    //   winningHand,
    //   totalGames,
    //   totalWinnings - totalBets,
    //   Number(((totalWinnings - totalBets) / totalGames).toPrecision(4))
    // );
  }, [handHistory]);

  return {
    deck,
    setDeck,
    status,
    setStatus,
    showOdds,
    setShowOdds,
    credits,
    setCredits,
    bet,
    setBet,
    cards,
    setCards,
    holds,
    setHolds,
    winningHand,
    setWinningHand,
    payouts,
    updateHolds,
    minusBet,
    betOne,
    betMax,
    dealOrDraw,
    percents,
    counts,
    calculatingOdds,
    setCalculating,
    handValues,
    handTitles,
    winnings,

    expectedValues,
    ev,
    optimalHolds,

    focalPoint,
    isTracking,

    handStatusBar: { ...handStatusBar, status, winningHand, winnings },
    betCreditStatusBar: { ...betCreditStatusBar, credits, bet },
    paySchedule: {
      ...paySchedule,
      handValues,
      payouts,
      bet,
      winningHand,
      expectedValues,
    },
  };
};
