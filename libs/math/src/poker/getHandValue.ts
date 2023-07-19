import { getRankValue } from './getRankValue';
import { getFlushValue } from './getFlushValue';
import { getStraightValue } from './getStraightValue';

export const getHandValue = (hand: number[]) => {
  const rankVal = getRankValue(hand);
  const flushVal = getFlushValue(hand);
  const straightVal = getStraightValue(hand);
  const straightFlushVal =
    flushVal > 0 && straightVal > 0 ? (straightVal === 409 ? 900 : 800) : 0;
  const handVal = Math.max(rankVal, flushVal, straightVal, straightFlushVal);

  return handVal - (handVal % 10);
};

export const getHandTitle = (hand: number[]) => {
  const handValue = getHandValue(hand);
  return handValue === 900
    ? 'Royal Flush'
    : handValue >= 800
    ? 'Straight Flush'
    : handValue >= 700
    ? 'Four of a Kind'
    : handValue >= 600
    ? 'Full House'
    : handValue >= 500
    ? 'Flush'
    : handValue >= 400
    ? 'Straight'
    : handValue >= 300
    ? 'Three of a Kind'
    : handValue >= 200
    ? 'Two Pair'
    : handValue === 110
    ? 'Jacks or Better'
    : handValue >= 100
    ? 'Low Pair'
    : 'High Card';
};
