// import { useState } from "react";
import { getBlackJackRanks } from "../../lib/getRank";
import { BlackjackHandProps, BlackjackHand } from "./bj-hand";
import { BlackjackBank } from "./bj-bank";
import { BlackjackButtons } from "./bj-buttons";
export interface BlackjackPlayerProps {
  hands: BlackjackHandProps[];
  handIndex: number;
  bank: number;
  sittingOut?: boolean;
  autoRebet?: boolean;
  autoPlay?: boolean;
}

interface ActiveBlackjackPlayerProps extends BlackjackPlayerProps {
  active: boolean;
  gameStatus: string;
  maxSplits: number;
  playerDecision: string;
  setPlayerDecision: (decision: string) => void;
  playerId: string;
  handleBet: (bet: number, playerId: string) => void;
  handleInsurance: (insuranceDecision: boolean, playerId: string) => void;
  minBet: number;
}

const splitCheck = (
  hands: string | any[],
  handIndex: number,
  maxSplit: number,
  bank: number
) => {
  const hand = hands[handIndex];
  const bet = hand.bets.bet;
  const raws = hand.cards.map((x: { raw: number }) => x.raw);
  const ranks = getBlackJackRanks(raws);

  return (
    hands.length < maxSplit &&
    hand.cards.length === 2 &&
    ranks[0] === ranks[1] &&
    bet <= bank
  );
};

const doubleCheck = (
  hand: { cards: any[]; bets: { bet: number } },
  bank: number
) => {
  const bet = hand.bets.bet;
  return hand.cards.length === 2 && bet <= bank;
};

export const BlackjackPlayer = (props: ActiveBlackjackPlayerProps) => {
  const {
    hands,
    handIndex,
    bank,
    active,
    gameStatus,
    maxSplits,
    playerDecision,
    setPlayerDecision,
    playerId,
    handleBet,
    handleInsurance,
    minBet,
  } = props;

  if (handIndex >= hands.length) {
    console.log(42, handIndex, hands.length, hands[handIndex]);
    return null;
  }

  const canSplit = splitCheck(hands, handIndex, maxSplits, bank);
  const canDouble = doubleCheck(hands[handIndex], bank);

  const playerHands = hands.map((hand, i) => (
    <div key={i} className="player-container">
      <BlackjackHand
        {...hand}
        gameStatus={gameStatus}
        playerId={playerId}
        handleBet={handleBet}
      />
      {i === handIndex ? (
        <BlackjackButtons
          setPlayerDecision={setPlayerDecision}
          handleInsurance={handleInsurance}
          gameStatus={gameStatus}
          playerDecision={playerDecision}
          playerId={playerId}
          active={active}
          canDouble={canDouble}
          canSplit={canSplit}
          isInsured={hands[handIndex].isInsured}
          bet={hands[handIndex].bets.bet}
          minBet={minBet}
        />
      ) : (
        <div className="blackjack-button-container" />
      )}
      {i === handIndex ? (
        <BlackjackBank bank={bank} playerId={playerId} handleBet={handleBet} />
      ) : (
        <div style={{ height: 86 }} />
      )}
    </div>
  ));

  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        // background: "yellow",
        // gridGap: 5,
        width: 300 * playerHands.length + 5 * (playerHands.length - 1),
      }}
    >
      {playerHands}

      {/* <div>{buttons}</div> */}
    </div>
  );
};

// If there isn't enough space to show multiple split hands, we will need a way to toggle between them
// const buttons = hands.map((hand, i) => {
//   return (
//     <button
//       key={i}
//       onClick={() => setHandIndex(i)}
//       // className={i === handIndex ? "selected" : ""}
//     >
//       {i + 1}
//     </button>
//   );
// });
