import { BlackjackPlayerProps } from "./bj-player";

export const rules = {
  decks: 1,
  dealerHitsSoft17: false,
  doubleAfterSplit: true,

  minBet: 5,
  maxBet: 1000,
  maxSplits: 4,

  maxPlayers: 4,

  blackjackPayout: 1.5,

  minRemaingCardsBeforeShuffle: 26,

  delay: 100,
};

// export const style = {
//   delay: 250,
// };

export const dummyPlayerData = {
  hands: [
    {
      cards: [
        { raw: Math.floor(Math.random() * 52), show: true, exit: false },
        { raw: Math.floor(Math.random() * 52), show: true, exit: false },
        { raw: Math.floor(Math.random() * 52), show: true, exit: false },
      ],
      bets: {
        bet: 999.5,
        doubleBet: 33.5,
        insuranceBet: 88,
        amountWon: 999,
        amountLost: 0,
      },
      isFinished: false,
      isBusted: false,
      isDoubled: false,
      isBlackjack: false,
      isSplit: false,
      isSettled: false,
      isInsured: null,
      result: "",
    },
    {
      cards: [
        { raw: Math.floor(Math.random() * 52), show: true, exit: false },
        { raw: Math.floor(Math.random() * 52), show: true, exit: false },
        { raw: Math.floor(Math.random() * 52), show: true, exit: false },
      ],
      bets: {
        bet: 999.5,
        doubleBet: 33.5,
        insuranceBet: 88,
        amountWon: 999,
        amountLost: 0,
      },
      isFinished: false,
      isBusted: false,
      isDoubled: false,
      isBlackjack: false,
      isSplit: false,
      isSettled: false,
      isInsured: null,
      result: "",
    },
  ],

  handIndex: 0,
  bank: 1000,
};

interface dummyType {
  [key: string]: BlackjackPlayerProps;
}

export const dummyPlayers: dummyType = {
  // player1: { ...dummyPlayerData },
  player2: {
    hands: [
      {
        cards: [
          { raw: Math.floor(Math.random() * 52), show: true, exit: false },
          { raw: Math.floor(Math.random() * 52), show: true, exit: false },
        ],
        bets: {
          bet: 999.5,
          doubleBet: 33.5,
          insuranceBet: 88,
          amountWon: 999,
          amountLost: 0,
        },
        isFinished: false,
        isBusted: false,
        isDoubled: false,
        isBlackjack: false,
        isSplit: false,
        isSettled: false,
        isInsured: null,
        result: "",
      },
    ],

    handIndex: 0,
    bank: 1000,
  },
};
