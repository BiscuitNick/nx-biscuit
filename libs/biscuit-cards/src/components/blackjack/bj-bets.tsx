import { BlackjackChips } from "../chips/bj-chips";

interface BlackjackBetsProps {
  bet: number;
  doubleBet: number;
  insuranceBet: number;
  amountWon: number;
  amountLost: number;

  playerId: string;
  handleBet: (bet: number, playerId: string) => void;
}

export const BlackjackBets = (props: BlackjackBetsProps) => {
  const { bet, doubleBet, insuranceBet, amountWon, handleBet, playerId } =
    props;

  return (
    <div className="bet-container">
      <div className="bj-chips">
        {/* <div
          style={{
            position: "absolute",
            height: 110,
            width: 110,
            borderRadius: 100,
            left: 95,
            top: -25,
            border: "1px solid white",
          }}
        ></div> */}
        <BlackjackChips
          amount={insuranceBet}
          left={25}
          handleBet={handleBet}
          playerId={playerId}
        />
        <BlackjackChips
          amount={bet}
          left={!doubleBet ? 125 : 100}
          handleBet={handleBet}
          playerId={playerId}
          // y={0}
        />
        <BlackjackChips
          amount={doubleBet}
          left={150}
          handleBet={handleBet}
          playerId={playerId}
          // y={0}
        />
        <BlackjackChips
          amount={amountWon}
          left={250}
          handleBet={handleBet}
          playerId={playerId}
          y={-1000}
        />
      </div>
      <div className="bj-amounts-container">
        {insuranceBet > 0 && (
          <div className="bj-amount" style={{ left: 25 }}>
            {insuranceBet % 1 > 0
              ? `$${insuranceBet.toFixed(2)}`
              : `$${insuranceBet}`}
          </div>
        )}
        {bet + doubleBet > 0 && (
          <div
            className="bj-amount"
            style={{
              left: doubleBet > 0 ? 100 : 125,
              width: doubleBet ? 100 : 50,
            }}
          >
            {(bet + doubleBet) % 1 > 0
              ? `$${(bet + doubleBet).toFixed(2)}`
              : `$${bet + doubleBet}`}
          </div>
        )}
        {amountWon > 0 && (
          <div className="bj-amount" style={{ left: 250 }}>
            {amountWon % 1 > 0 ? `$${amountWon.toFixed(2)}` : `$${amountWon}`}
          </div>
        )}
      </div>
    </div>
  );
};
