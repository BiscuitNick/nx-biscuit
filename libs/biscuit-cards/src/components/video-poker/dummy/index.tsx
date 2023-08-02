export const DummyPoker = () => {
  //   const { initCards } = props;
  //   const {
  //     status,
  //     showOdds,
  //     setShowOdds,
  //     credits,
  //     bet,
  //     cards,
  //     holds,
  //     winningHand,
  //     payouts,
  //     updateHolds,
  //     minusBet,
  //     betOne,
  //     betMax,
  //     dealOrDraw,
  //     percents,
  //     counts,
  //     calculatingOdds,
  //   } = useVideoPoker({
  //     initCards: initCards,
  //     initHolds: [true, true, true, true, false],
  //     initStatus: 'pendingDraw',
  //   });

  return <div>DummyPoker Placeholder</div>;
};

// useEffect(() => {
//   async function getDraws() {
//     setCalculating(true);
//     const draws = await drawCombinationValues(heldCards, drawDeck);

//     await sleep(1000);

//     console.log(draws);
//     setCalculating(false);
//   }

//   const heldCards = holds
//     .map((h, i) => (h ? cards[i] : -1))
//     .filter((c) => c !== -1);
//   // console.log(heldCards);
//   const drawDeck = [...deck].slice(5);

//   if (heldCards.length > 0) {
//     getDraws();
//   }
// }, [holds]);
