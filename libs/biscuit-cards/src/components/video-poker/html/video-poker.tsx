import { PayTable } from './pay-table';
import { CardRow } from './card-row';
import { BottomButtons } from './bottom-buttons';
import '../Poker.css';
import { useVideoPoker } from '../hooks/use-video-poker';

export const VideoPoker = () => {
  const {
    status,
    showOdds,
    setShowOdds,
    credits,
    bet,
    cards,
    holds,
    winningHand,
    payouts,
    updateHolds,
    minusBet,
    betOne,
    betMax,
    dealOrDraw,
    percents,
    counts,
  } = useVideoPoker();

  return (
    <div className="draw-poker-container">
      <PayTable
        credits={bet}
        hand={winningHand}
        payouts={payouts}
        showOdds={showOdds}
        odds={percents}
      />
      <div className="draw-poker-status">
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
      <div className="draw-poker-status">
        <div className="border-text">BET {bet}</div>
        <div className="border-text" style={{ textAlign: 'center' }}></div>
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
