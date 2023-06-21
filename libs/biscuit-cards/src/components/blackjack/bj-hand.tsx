import { BlackjackBets } from "./bj-bets";
import { BlackjackCards } from "./bj-cards";
import { getBlackJackHandTotal } from "../../lib/getRank";

export interface BlackjackHandProps {
  cards: { raw: number; show: boolean; exit: boolean }[];
  bets: {
    bet: number;
    doubleBet: number;
    insuranceBet: number;
    amountWon: number;
    amountLost: number;
  };

  //
  isFinished: boolean;
  isBusted: boolean;
  isDoubled: boolean;
  isBlackjack: boolean;
  isSplit: boolean;
  isSettled: boolean;
  isInsured: boolean | null;

  //
  result: string;
}

interface ActiveHandProps extends BlackjackHandProps {
  gameStatus: string;
  playerId: string;
  handleBet: (bet: number, playerId: string) => void;
}

export const BlackjackHand = (props: ActiveHandProps) => {
  const { cards, bets, playerId, handleBet, result } = props; //gameStatus

  const raws = cards.filter((c) => c.show).map((x) => x.raw);
  const total = getBlackJackHandTotal(raws);

  return (
    <>
      <BlackjackBets {...bets} playerId={playerId} handleBet={handleBet} />
      <BlackjackCards cards={cards} />
      <div className="total-text" onClick={() => console.log(props)}>
        {result ? result : cards.length ? total : null}
      </div>
    </>
  );
};
