import { PayoutSchedule } from '../constants';
import { drawCombinations } from '../getDrawCombinations';
import { standardDeck } from '../deck';
import { payouts96 } from '../constants';
import { getDraws } from './getDrawValue';

interface getMaxEvDrawsProps {
  hand: number[];
  discards?: number[];
  deck?: number[];

  payouts?: any;
  //   payoutSchedule?: PayoutSchedule;
}

export const getMaxEvDraws = (props: getMaxEvDrawsProps) => {
  const {
    // hand = [],
    hand,
    discards = [],
    deck = standardDeck,

    // payouts

    payouts = {
      900: 4000,
      800: 250,
      700: 125,
      600: 45,
      500: 30,
      400: 20,
      300: 15,
      200: 10,
      110: 5,
      100: 0,
      0: 0,
    },
  } = props;

  const filteredDeck = deck.filter(
    (card) => !hand.includes(card) && !discards.includes(card)
  );

  const hold5s = drawCombinations([], hand, 5);
  const hold4s = drawCombinations([], hand, 4);
  const hold3s = drawCombinations([], hand, 3);
  const hold2s = drawCombinations([], hand, 2);
  const hold1s = drawCombinations([], hand, 1);
  const hold0s = drawCombinations([], hand, 0);

  let maxEv = 0;
  let optimalHolds = [false, false, false, false, false];
  let holdCards: number[] = [];

  [...hold5s, ...hold4s, ...hold3s, ...hold2s, ...hold1s, ...hold0s].forEach(
    (holds) => {
      const discards = hand.filter((card) => !holds.includes(card));
      const { percents } = getDraws({
        hand: holds,
        discards,
        deck: filteredDeck,
      });

      let ev = 0;
      Object.keys(percents).forEach((key) => {
        ev += percents[key] * payouts[key];
      });

      if (ev > maxEv) {
        maxEv = ev;
        optimalHolds = hand.map((card) => holds.includes(card));
        holdCards = holds;
      }
    }
  );

  return { holds: optimalHolds, ev: maxEv, cards: holdCards };
};
