// import { AnimatedChip } from "./animated-chip";

const chipsValues = [500, 100, 25, 5, 1];

const getChipValues = (amnt: number) => {
  const betChips: (number | "50cent")[] = [];
  chipsValues.forEach((chipValue) => {
    while (amnt >= chipValue) {
      betChips.push(chipValue);
      amnt -= chipValue;
    }
  });

  if (amnt >= 0.5) {
    betChips.push("50cent");
  }

  return betChips;
};

interface BlackjackChipsProps {
  amount: number;
  left: number;
  y?: number;
  playerId: string;
  handleBet: (bet: number, playerId: string) => void;
}

export const BlackjackChips = (props: BlackjackChipsProps) => {
  // const { amount, setBet, playerIndex, left, bottom } = props;
  const { amount, left, handleBet, playerId, y } = props;

  const betChips = getChipValues(amount);

  console.log(35, amount, y);

  return (
    <>
      {betChips.map((chipValue, i) => (
        // <AnimatedChip
        //   key={i}
        //   bottom={-i * 4}
        //   left={left}
        //   y={y}
        //   value={chipValue}
        //   handleClick={() => handleBet(-chipValue, playerId)}
        // />
        <img
          key={i}
          style={{ bottom: i * 4 - 50, left }}
          className="bet-chip"
          src={`/chips/${chipValue}.png`}
          onClick={() => handleBet(-chipValue, playerId)}
        />
      ))}
    </>
  );
};
