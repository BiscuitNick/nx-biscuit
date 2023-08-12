import { getTotalCombinations } from '../getTotalCombinations';
import {
  standardDeck,
  getFilteredDeck,
  getRankCounts,
  getRanks,
} from '../deck';

import { getDrawsProps } from './getDrawValue';

export const getJacksOrBetterDraws = (props: getDrawsProps) => {
  // TODO: Replace hardcoded values with algorithm.
  const { hand = [], discards = [], deck = standardDeck } = props;
  const filteredDeck = getFilteredDeck({ hand, discards, deck });
  const remainingCards = filteredDeck.length;
  const deckRankCounts = getRankCounts(filteredDeck);
  const discardRankCounts = getRankCounts(discards);
  const {
    trips: discardedTrips,
    pairs: discardedPairs,
    kickers: discardedKickers,
  } = getRanks(discards);
  const { quads, trips, pairs, kickers } = getRanks(hand);
  const handRanks = hand.map((card) => card % 13);

  discards.forEach((card) => {
    const rank = card % 13;
    discardRankCounts[rank]++;
  });

  // Discards used for hard-coded conditionals
  const discardedPair = discardedPairs.length === 1;
  const discardedTrip = Math.max(...discardRankCounts) === 3;
  const discardedFullHouse = discardedPair && discardedTrip;
  const discardedQuad = Math.max(...discardRankCounts) === 4;
  const discardedTwoPair = discardedPairs.length === 2;
  const discardedUnmatched = Math.max(...discardRankCounts) < 2;

  const upperPairs = discardedPairs.filter(
    (pair) => pair >= 10 || pair === 0
  ).length;
  const upperRanks = [deckRankCounts[0], ...deckRankCounts.slice(10)];
  const remainingJacksOrBetter = upperRanks.reduce((a, b) => a + b);
  const upperRankPairs = pairs.filter(
    (pair) => pair === 0 || pair >= 10
  ).length;

  let potentialJacksOrBetter = 0;

  if (hand.length === 0) {
    if (remainingCards === 52) {
      potentialJacksOrBetter = 337920;
    } else if (remainingCards === 51) {
      potentialJacksOrBetter = remainingJacksOrBetter === 16 ? 316800 : 279840;
    } else if (remainingCards === 50) {
      potentialJacksOrBetter =
        remainingJacksOrBetter === 16
          ? discardedPair
            ? 295680
            : 296640
          : remainingJacksOrBetter === 15
          ? 262080
          : remainingJacksOrBetter === 14
          ? discardedPair
            ? 235840
            : 227520
          : 0;
    } else if (remainingCards === 49) {
      potentialJacksOrBetter =
        remainingJacksOrBetter === 16
          ? discardedTrip
            ? 274560
            : discardedPair
            ? 276480
            : 277416
          : remainingJacksOrBetter === 15
          ? discardedPair
            ? 244320
            : 245142
          : remainingJacksOrBetter === 14
          ? discardedPair
            ? 198216
            : 212868
          : remainingJacksOrBetter === 13
          ? discardedTrip
            ? 205920
            : discardedPair
            ? 188400
            : 180594
          : 0;
    } else if (remainingCards === 48) {
      //TODO COMEBACK TO THIS. REPLACE HARD VALUES
      potentialJacksOrBetter =
        remainingJacksOrBetter === 16
          ? discardedQuad
            ? 253440
            : discardedTrip
            ? 256320
            : discardedTwoPair
            ? 257280
            : discardedPair
            ? 258192
            : 259104
          : remainingJacksOrBetter === 15
          ? discardedTrip
            ? 226560
            : discardedPair
            ? 228204
            : 229005
          : remainingJacksOrBetter === 14
          ? discardedTwoPair
            ? 205280
            : discardedPair
            ? upperRankPairs === 1
              ? 206004
              : 198216
            : 0
          : remainingJacksOrBetter === 13
          ? discardedTrip
            ? 205920
            : discardedPair
            ? 188400
            : 180594
          : remainingJacksOrBetter === 12
          ? discardedTrip
            ? 205920
            : discardedPair
            ? 188400
            : 180594
          : 0;
    } else if (remainingCards === 47) {
      if (discardedUnmatched) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 241680
            : remainingJacksOrBetter === 15
            ? 213648
            : remainingJacksOrBetter === 14
            ? 185616
            : remainingJacksOrBetter === 13
            ? 157584
            : remainingJacksOrBetter === 12
            ? 129552
            : 0;
      } else if (discardedQuad) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 236160
            : remainingJacksOrBetter === 15
            ? 208800
            : remainingJacksOrBetter === 12
            ? 177120
            : remainingJacksOrBetter === 11
            ? 149760
            : 0;
      } else if (discardedFullHouse) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 238080
            : remainingJacksOrBetter === 14
            ? 190000
            : remainingJacksOrBetter === 13
            ? 178560
            : remainingJacksOrBetter === 11
            ? 130480
            : 0;
      } else if (discardedPair) {
        if (upperRankPairs === 1) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 14
              ? 192153
              : remainingJacksOrBetter === 13
              ? 164229
              : remainingJacksOrBetter === 12
              ? 136305
              : remainingJacksOrBetter === 11
              ? 108381
              : 0;
        } else {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 16
              ? 240792
              : remainingJacksOrBetter === 15
              ? 212868
              : remainingJacksOrBetter === 14
              ? 184944
              : remainingJacksOrBetter === 13
              ? 157020
              : 0;
        }
      } else if (discardedTwoPair) {
        if (upperRankPairs === 2) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 12
              ? 142992
              : remainingJacksOrBetter === 11
              ? 115176
              : 0;
        } else if (upperRankPairs === 1) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 14
              ? 191448
              : remainingJacksOrBetter === 13
              ? 163632
              : 0;
        } else {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 16
              ? 239904
              : remainingJacksOrBetter === 15
              ? 212088
              : 0;
        }
      } else if (discardedTrip) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 238968
            : remainingJacksOrBetter === 15
            ? 211266
            : remainingJacksOrBetter === 14
            ? 183564
            : remainingJacksOrBetter === 13
            ? 179226
            : remainingJacksOrBetter === 12
            ? 151524
            : remainingJacksOrBetter === 11
            ? 123822
            : 0;
      }

      //
    }
  } else if (hand.length === 1) {
    const [cardRank] = kickers;
    const remainingCardRank = deckRankCounts[cardRank];

    if (cardRank === 0 || cardRank >= 10) {
      if (discardedUnmatched) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 15
            ? 45456
            : remainingJacksOrBetter === 14
            ? remainingCardRank === 3
              ? 43389
              : 36852
            : remainingJacksOrBetter === 13
            ? remainingCardRank === 3
              ? 41322
              : 34677
            : remainingJacksOrBetter === 12
            ? remainingCardRank === 3
              ? 39255
              : 32502
            : 0;
      } else if (discardedQuad) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 15
            ? 44640
            : remainingJacksOrBetter === 11
            ? 40320
            : 0;
      } else if (discardedTrip) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 15
            ? 45054
            : remainingJacksOrBetter === 14
            ? remainingCardRank === 3
              ? 42996
              : 36560
            : remainingJacksOrBetter === 12
            ? 40716
            : remainingJacksOrBetter === 11
            ? remainingCardRank === 3
              ? 38658
              : 32000
            : 0;
      } else if (discardedTwoPair) {
        if (upperPairs === 2) {
          potentialJacksOrBetter = remainingCardRank === 3 ? 38104 : 22800;
        } else if (upperPairs === 1) {
          potentialJacksOrBetter = remainingCardRank === 3 ? 41648 : 26720;
        } else {
          potentialJacksOrBetter = 45192;
        }
      } else if (discardedPair) {
        if (upperPairs === 1) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 13
              ? remainingCardRank === 3
                ? 41775
                : 26778
              : remainingJacksOrBetter === 12
              ? remainingCardRank === 3
                ? 39711
                : remainingCardRank === 2
                ? 33024
                : 24492
              : remainingJacksOrBetter === 11
              ? remainingCardRank === 3
                ? 37647
                : remainingCardRank === 2
                ? 30852
                : 22206
              : 0;
        } else {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 15
              ? 45324
              : remainingJacksOrBetter === 14
              ? remainingCardRank === 3
                ? 43260
                : 36756
              : remainingJacksOrBetter === 13
              ? remainingCardRank === 3
                ? 41196
                : 34584
              : 0;
        }
      }
    } else {
      if (discardedUnmatched) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? remainingCardRank === 3
              ? 17424
              : 18312
            : remainingJacksOrBetter === 15
            ? remainingCardRank === 3
              ? 15357
              : 16137
            : remainingJacksOrBetter === 14
            ? remainingCardRank === 3
              ? 13290
              : 13962
            : remainingJacksOrBetter === 13
            ? remainingCardRank === 3
              ? 11223
              : 11787
            : remainingJacksOrBetter === 12
            ? 9156
            : 0;
      } else if (discardedQuad) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? 17280
            : remainingJacksOrBetter === 12
            ? 12960
            : 0;
      } else if (discardedTrip) {
        potentialJacksOrBetter =
          remainingJacksOrBetter === 16
            ? remainingCardRank === 3
              ? 17352
              : remainingCardRank === 2
              ? 18240
              : 20160
            : remainingJacksOrBetter === 15
            ? remainingCardRank === 3
              ? 15294
              : 17760
            : remainingJacksOrBetter === 13
            ? remainingCardRank === 3
              ? 13014
              : 13680
            : remainingJacksOrBetter === 12
            ? 10956
            : 0;
      } else if (discardedTwoPair) {
        const upperPairs = discardedPairs.filter(
          (pair) => pair >= 10 || pair === 0
        ).length;

        if (upperPairs === 2) {
          potentialJacksOrBetter = 10288;
        } else if (upperPairs === 1) {
          potentialJacksOrBetter = remainingCardRank === 3 ? 13832 : 15280; //remainingCardRank === 3 ? 13832 : 15280;
        } else {
          potentialJacksOrBetter = remainingCardRank === 3 ? 17376 : 19200; //remainingCardRank === 3 ? 13832 : 15280;
        }
      } else if (discardedPair) {
        if (upperPairs === 1) {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 14
              ? remainingCardRank === 3
                ? 13851
                : 14556
              : remainingJacksOrBetter === 13
              ? remainingCardRank === 3
                ? 11787
                : 12384
              : remainingJacksOrBetter === 12
              ? 9723
              : 0;
        } else {
          potentialJacksOrBetter =
            remainingJacksOrBetter === 16
              ? remainingCardRank === 3
                ? 17400
                : remainingCardRank === 2
                ? 18288
                : 19224
              : remainingJacksOrBetter === 15
              ? remainingCardRank === 3
                ? 15336
                : remainingCardRank === 2
                ? 16116
                : 16938
              : remainingJacksOrBetter === 14
              ? remainingCardRank === 3
                ? 13272
                : 14652
              : 0;
        }
      }
    }
  } else if (hand.length === 2) {
    // If Pair
    if (pairs.length === 1) {
      const [pair] = pairs;
      // If Jacks Or better, calculate odds of not improving hand
      if (pair === 0 || pair >= 10) {
        const remainingPairRank = deckRankCounts[pair];
        deckRankCounts[pair] = 0;
        const tripUpPair =
          remainingPairRank *
          getTotalCombinations(remainingCards - remainingPairRank, 2);

        const quadUpPair = remainingPairRank === 2 ? remainingCards - 2 : 0;

        const remainingQuads = deckRankCounts.filter(
          (count) => count === 4
        ).length;
        const remainingTrips = deckRankCounts.filter(
          (count) => count === 3
        ).length;
        const remainingPairs = deckRankCounts.filter(
          (count) => count === 2
        ).length;

        // const fullHousePair = remainingPairRank * remainingQuads * 6;
        const pairsFromQuads =
          remainingQuads * 6 * (remainingCards - 4 - remainingPairRank);
        const tripsFromQuads = remainingQuads * 4;
        const tripsFromTrips = remainingTrips;
        const pairsFromTrips =
          remainingTrips * 3 * (remainingCards - 3 - remainingPairRank);
        const pairsFromPairs =
          remainingPairs * (remainingCards - 2 - remainingPairRank);

        // const fullHouse = remainingPairRank * pairsFromQuads;

        const totalCombinations = getTotalCombinations(remainingCards, 3);

        potentialJacksOrBetter =
          totalCombinations -
          pairsFromQuads -
          tripsFromQuads -
          tripsFromTrips -
          pairsFromTrips -
          pairsFromPairs -
          tripUpPair -
          quadUpPair;

        // console.log(
        //   remainingPairRank,
        //   pairsFromQuads,
        //   tripsFromQuads,
        //   tripUpPair
        // );
      }
      // Lower pair cannot improve to Jacks or Better (can improve to TwoPair, Trips, FH, or Quad)
    } else {
      const highKickers = kickers.filter(
        (kicker) => kicker === 0 || kicker >= 10
      );
      const lowKickers = kickers.filter((kicker) => kicker > 0 && kicker < 10);

      // If both kickers are high cards
      if (highKickers.length === 2) {
        const [high0, high1] = highKickers;
        // console.log('high kickers', high0, high1, upperRanks);
      } else if (highKickers.length === 1) {
        if (discardedTrips.length === 1) {
          //
        } else if (discardedPairs.length === 1) {
          //
        } else {
          // const remainingCardRank = deckRankCounts[cardRank];
          // potentialJacksOrBetter =
          //   remainingJacksOrBetter === 15
          //     ? 45324
          //     : remainingJacksOrBetter === 14
          //     ? remainingCardRank === 3
          //       ? 43260
          //       : 36756
          //     : remainingJacksOrBetter === 13
          //     ? remainingCardRank === 3
          //       ? 41196
          //       : 34584
          //     : 0;
        }

        // THIS DOESN'T WORK. What are we missing??
        // const [high] = highKickers;
        // const [low] = lowKickers;
        // const remainingHigh = deckRankCounts[high];
        // const remainingLow = deckRankCounts[low];
        // const adjustedRemainingCards =
        //   remainingCards - remainingHigh - remainingLow;
        // deckRankCounts[high] = 0;
        // deckRankCounts[low] = 0;
        // const upperRanks = [deckRankCounts[0], ...deckRankCounts.slice(10)];
        // const lowerRanks = deckRankCounts.slice(1, 10);
        // const pairsFromQuads =
        //   upperRanks.filter((rank) => rank === 4).length * 6;
        // const pairsFromTrips =
        //   upperRanks.filter((rank) => rank === 3).length * 3;
        // const pairsFromPairs = upperRanks.filter((rank) => rank === 2).length;
        // const lowPairsFromQuads =
        //   lowerRanks.filter((rank) => rank === 4).length * 6;
        // const lowPairsFromTrips =
        //   lowerRanks.filter((rank) => rank === 3).length * 3;
        // const lowPairsFromPairs = lowerRanks.filter(
        //   (rank) => rank === 2
        // ).length;
        // const lowPairs =
        //   lowPairsFromQuads + lowPairsFromTrips + lowPairsFromPairs;
        // const highPairs =
        //   remainingHigh * getTotalCombinations(adjustedRemainingCards, 2);
        // const qPairs = pairsFromQuads * (adjustedRemainingCards - 4);
        // const tPairs = pairsFromTrips * (adjustedRemainingCards - 3);
        // const pPairs = pairsFromPairs * (adjustedRemainingCards - 2);
        // potentialJacksOrBetter =
        //   highPairs + qPairs + tPairs + pPairs - lowPairs;

        potentialJacksOrBetter = 2847;

        // console.log(lowPairs, highPairs, qPairs, tPairs, pPairs);
      } else {
        // THIS WORKS
        // Both Kickers are low cards.

        const [low0, low1] = lowKickers;

        const remainingLow0 = deckRankCounts[low0];
        const remainingLow1 = deckRankCounts[low1];

        const adjustedRemainingCards =
          remainingCards - remainingLow0 - remainingLow1;

        const pairsFromQuads =
          upperRanks.filter((rank) => rank === 4).length * 6;
        const pairsFromTrips =
          upperRanks.filter((rank) => rank === 3).length * 3;
        const pairsFromPairs = upperRanks.filter((rank) => rank === 2).length;

        const qPairs = pairsFromQuads * (adjustedRemainingCards - 4);
        const tPairs = pairsFromTrips * (adjustedRemainingCards - 3);
        const pPairs = pairsFromPairs * (adjustedRemainingCards - 2);

        potentialJacksOrBetter = qPairs + tPairs + pPairs;
      }

      // If no pair, calculate odds of improving to Jacks or Better
    }
  } else if (hand.length === 3) {
    const [card0, card1, card3] = handRanks;

    //
  } else if (hand.length === 4) {
    const [card0, card1, card3, card4] = handRanks;

    //
  } else if (hand.length === 5) {
    const [card0, card1, card3, card4, card5] = handRanks;

    //
  }

  return potentialJacksOrBetter;
};
