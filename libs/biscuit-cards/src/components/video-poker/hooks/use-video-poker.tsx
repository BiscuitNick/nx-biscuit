'use client';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import {
  getDraws,
  getMaxEvDraws,
  getHandValue,
  getHandTitle,
  shuffledDeck,
  shuffle,
  payouts96,
  valueCounts,
  valueCounter,
  handValues,
  handValueTitles,
} from '@biscuitnick/math';

import { sleep } from '../../blackjack/helpers';

import { useVideoPokerDimensions } from './use-video-poker-dimensions';
interface useVideoPokerProps {
  initBet?: number;
  initCredits?: number;
  initStatus?: string;
  initCards?: number[];
  initHolds?: boolean[];
  initShowOdds?: boolean;

  width?: number;
  height?: number;
  payScheduleView?: 'odds-and-payouts' | 'detailed-odds' | 'payouts-only';
}

export const useVideoPoker = (props: useVideoPokerProps) => {
  const {
    initBet = 5,
    initCredits = 995,
    initStatus = 'pendingNewGame',
    initCards = [-1, -1, -1, -1, -1],
    initHolds = [false, false, false, false, false],
    width = 500,
    height = 500,
    payScheduleView = 'odds-and-payouts',
  } = props;
  const [playCreditSound] = useSound('/sounds/winning-beep.mp3');

  // Deck //
  const [deck, setDeck] = useState<number[]>(shuffledDeck(1));
  const [status, setStatus] = useState<string>(initStatus);

  // Bet & Credits //
  const [bet, setBet] = useState<number>(initBet);
  const [credits, setCredits] = useState<number>(initCredits);

  // Hand Data, Card & Holds //
  const [cards, setCards] = useState<number[]>(initCards);
  const [holds, setHolds] = useState<boolean[]>(initHolds);
  const [optimalHolds, setOptimalHolds] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  //

  // TODO: Replace winningHand with handValue & handTitle //
  //

  // Hand Value & Title //
  const [handValue, setHandValue] = useState<number>(0);
  const [handTitle, setHandTitle] = useState<string>('');

  // Table Data & Stats //
  const [percents, setPercents] = useState<valueCounts>({ ...valueCounter }); //setPercents
  const [counts, setCounts] = useState<valueCounts>({ ...valueCounter }); //setCounts
  const [expectedValues, setExpectedValues] = useState<valueCounts>({
    ...valueCounter,
  });

  const [ev, setEV] = useState<number>(0);

  // Game Settings //
  const autoPlaySpeed = 1000;
  const standardGameDelay = 1000;
  const payoutSpeed = 100; //

  const [winnings, setWinnings] = useState<number>(0);
  const [paidWinnings, setPaidWinnings] = useState<number>(0);

  // const [totalGames, setTotalGames] = useState(0);
  // const [maxGames, setMaxGames] = useState(1000);
  const [totalBets, setTotalBets] = useState<number>(0);
  // const [totalWinnings, setTotalWinnings] = useState<number>(0);
  // const [handHistory, setHandHistory] = useState<valueCounts>({
  //   ...valueCounter,
  // });
  const handTitles = handValues.map((val: string) => handValueTitles[val]);
  const payouts = payouts96;

  const [isTracking, setIsTracking] = useState(true);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showBuddy, setShowBuddy] = useState<boolean>(false);
  const [playSounds, setPlaySounds] = useState<boolean>(false);

  const [betPayouts, setBetPayouts] = useState<valueCounts>({
    ...valueCounter,
  });

  useEffect(() => {
    const _betPayouts: valueCounts = {};
    Object.keys(payouts).forEach((key) => {
      _betPayouts[key] = payouts[key][bet - 1];
    });
    setBetPayouts(_betPayouts);
  }, [bet, payouts]);

  const {
    pokerHand,
    handStatusBar,
    betCreditStatusBar,
    paySchedule,
    bottomButtonRow,
  } = useVideoPokerDimensions({
    width,
    height,
    handTitles,
    payouts,
    bet,
    expectedValues,
    handValues,
    ev,
    percents,
    counts,
    payScheduleView,
    marginFactor: 0.01,
  });

  const [focalPoint, setFocalPoint] = useState({ x: 0, y: 0 });

  const toggleSounds = () => {
    setPlaySounds(!playSounds);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleBuddy = () => {
    setShowBuddy(!showBuddy);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const updateHolds = (index: number) => {
    if (status !== 'pendingDraw' && status !== 'pendingHolds') return;
    const newHolds = [...holds];
    newHolds[index] = !newHolds[index];
    setHolds(newHolds);
  };

  const minusBet = () => {
    if (status !== 'pendingNewGame') return;

    const newBet = bet - 1 >= 1 ? bet - 1 : 1;
    const diff = bet - newBet;
    const newCredits = credits + diff;

    setBet(newBet);
    setCredits(newCredits);
  };

  const betOne = () => {
    if (status !== 'pendingNewGame') return;
    const newBet = bet + 1 > 5 ? bet : bet + 1;
    const diff = bet - newBet;
    const newCredits = credits + diff;

    setBet(newBet);
    setCredits(newCredits);
  };

  const betMax = () => {
    if (status !== 'pendingNewGame') return;

    const newBet = 5;
    const diff = bet - 5;
    const newCredits = credits + diff;

    setBet(newBet);
    setCredits(newCredits);
  };

  const dealOrDraw = () => {
    if (status === 'pendingNewGame') {
      setStatus('dealingCards');
      const newCredits = credits - bet;

      setTotalBets(totalBets + bet);
      setCredits(newCredits);
    } else if (status === 'pendingHolds') {
      setStatus('pendingDraw');
    }
  };

  useEffect(() => {
    async function dealNewGame() {
      const newDeck = shuffle(deck);
      setCards(newDeck.slice(0, 5));
      setHolds([false, false, false, false, false]);
      setOptimalHolds([false, false, false, false, false]);
      setDeck(newDeck);

      await sleep(standardGameDelay);
      setStatus('pendingHolds');
    }

    async function dealDraw() {
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

      // await sleep(autoPlaySpeed); //100 // 500
      setCards(hand);
      await sleep(autoPlaySpeed); // 500
      setStatus('pendingSettlement');
    }

    async function payoutWinnings() {
      await sleep(payoutSpeed);

      const remainingCreditsToPay = winnings - paidWinnings;
      if (remainingCreditsToPay > 0) {
        const newPaidWinnings = paidWinnings + 1;
        if (playSounds) {
          playCreditSound();
        }
        setPaidWinnings(newPaidWinnings);
        setCredits(credits + 1);
      } else {
        await sleep(payoutSpeed);
        setStatus('pendingNewGame');
        setPaidWinnings(0);
      }
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
      const _handTitle = getHandTitle(cards);
      const _handValue = getHandValue(cards);
      const { holds: optimals } = getMaxEvDraws({
        hand: cards,
        payouts: betPayouts,
      });

      setOptimalHolds(optimals);
      setHandTitle(_handTitle);
      setHandValue(_handValue);
      if (autoPlay) {
        setStatus('autoSetHolds');
      }

      //
    } else if (status === 'pendingDraw') {
      setStatus('dealingDraw');
      //
    } else if (status === 'dealingDraw') {
      dealDraw();
    } else if (status === 'pendingSettlement') {
      // Determine Hand Value, Title, & Winnings to be Paid //
      const _handTitle = getHandTitle(cards);
      const _handValue = getHandValue(cards);
      const _winnings = betPayouts[_handValue];
      setHandTitle(_handTitle);
      setHandValue(_handValue);
      setWinnings(_winnings);
      setStatus('pendingPayouts');
    } else if (status === 'pendingPayouts') {
      payoutWinnings();
    } else {
      // console.log(149, status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, paidWinnings]);

  // useEffect(() => {
  //   const handTitle = getHandTitle(cards);
  //   const hValue = getHandValue(cards);

  //   const winnings = payouts[hValue][bet - 1];

  //   setWinningHand(handTitle);
  //   setWinnings(winnings);
  // }, [bet, cards, payouts]);

  useEffect(() => {
    // if (cards.includes(-1)) return;

    const hand: number[] = [];
    const discards: number[] = [];

    holds.forEach((h, i) => {
      const card = cards[i];
      if (card === -1) return;
      else if (h) {
        hand.push(card);
      } else {
        discards.push(card);
      }
    });

    const { percents, counts } = getDraws({ hand, discards });

    const evs: valueCounts = valueCounter;
    let netEv = 0;
    Object.keys(percents).forEach((key) => {
      const payrate = betPayouts[key];
      const ev = payrate * percents[key];
      netEv += ev;
      evs[key] = ev;
    });

    setPercents(percents);
    setCounts(counts);
    setExpectedValues(evs);
    setEV(netEv);
  }, [betPayouts, cards, holds]);

  useEffect(() => {
    async function setNextHold() {
      const unMatchedHolds = holds
        .map((h, i) => (h !== optimalHolds[i] ? i : -1))
        .filter((i) => i > -1);

      if (unMatchedHolds.length === 0) {
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, status, optimalHolds, holds]);

  return {
    handStatusBar: {
      ...handStatusBar,
      status,
      handTitle,
      // winningHand,
      winnings,
    },
    betCreditStatusBar: { ...betCreditStatusBar, credits, bet },
    paySchedule: {
      ...paySchedule,
      handValues,
      payouts,
      bet,
      handTitle,
      expectedValues,
    },
    pokerHand: {
      ...pokerHand,
      cards,
      holds,
      status,
      optimalHolds,
      updateHolds,
    },
    bottomButtonRow: {
      ...bottomButtonRow,
      status,
      minusBet,
      betOne,
      betMax,
      dealOrDraw,
      toggleOptions,
    },
    status,
    // showOdds,
    // setShowOdds,
    credits,
    bet,
    cards,
    holds,
    // winningHand,
    payouts,
    updateHolds,
    minusBet,
    betOne,
    betMax,
    dealOrDraw,
    percents,
    counts,
    calculatingOdds: false,
    focalPoint,
    isTracking,
    toggleOptions,
    showOptions,
    toggleBuddy,
    showBuddy,
    toggleAutoPlay,
    autoPlay,
    toggleSounds,
    playSounds,
  };
};

// const newCredits = credits + winnings;
// const hValue = getHandValue(cards);
// console.log(handHistory[hValue] + 1);
// const historyCopy = { ...handHistory };
// historyCopy[hValue] += 1;
// await sleep(autoPlaySpeed); //2000
// const newTotal = totalGames + 1;
// if (newTotal >= maxGames) {
//   setAutoPlay(false);
// }
// setCredits(newCredits);
// setTotalGames(newTotal);
// setTotalWinnings(totalWinnings + winnings);
// setHandHistory(historyCopy);
