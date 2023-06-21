interface BlackjackButtonsProps {
  //   setGameStatus: (gameStatus: string) => void;
  setPlayerDecision: (decision: string) => void;
  handleInsurance: (insuranceDecision: boolean, playerId: string) => void;

  gameStatus: string;
  playerDecision: string;
  playerId: string;

  active: boolean;
  canDouble: boolean;
  canSplit: boolean;
  isInsured: boolean | null;
  bet: number;
  minBet: number;
}

export const BlackjackButtons = (props: BlackjackButtonsProps) => {
  const {
    setPlayerDecision,
    handleInsurance,
    gameStatus,
    playerDecision,
    playerId,
    active,
    canDouble,
    canSplit,
    isInsured,
    bet,
    minBet,
  } = props;

  const showButtons =
    gameStatus === "playersTurn" && active && playerDecision === "pending";
  // hands[handIndex].cards.length >= 2;

  return (
    <div className="blackjack-button-container">
      {showButtons && (
        <>
          <button
            className="hit-button"
            onClick={() => setPlayerDecision("hit")}
          >
            HIT
          </button>
          <button
            className="stand-button"
            onClick={() => setPlayerDecision("stand")}
          >
            STAND
          </button>
          {canDouble && (
            <button
              className="double-button"
              onClick={() => setPlayerDecision("double")}
            >
              DOUBLE
            </button>
          )}
          {canSplit && (
            <button
              className="split-button"
              onClick={() => setPlayerDecision("split")}
            >
              SPLIT
            </button>
          )}
        </>
      )}
      {gameStatus === "offerInsurance" && isInsured === null && (
        <>
          <button onClick={() => handleInsurance(false, playerId)}>No</button>
          <button onClick={() => handleInsurance(true, playerId)}>Yes</button>
        </>
      )}

      {gameStatus === "pendingNewGame" && bet >= minBet && (
        <button
          className="deal-button"
          //   onClick={() => setGameStatus("preDeal")}
          onClick={() => setPlayerDecision("ready")}
        >
          Deal
        </button>
      )}
    </div>
  );
};
