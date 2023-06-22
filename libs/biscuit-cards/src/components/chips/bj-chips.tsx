// import { AnimatedChip } from "./animated-chip";

const chipsValues = [500, 100, 25, 5, 1];

const getChipValues = (amnt: number) => {
  const betChips: (number | '50cent')[] = [];
  chipsValues.forEach((chipValue) => {
    while (amnt >= chipValue) {
      betChips.push(chipValue);
      amnt -= chipValue;
    }
  });

  if (amnt >= 0.5) {
    betChips.push('50cent');
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
  const { amount, left, handleBet, playerId, y } = props;

  const betChips = getChipValues(amount);

  return (
    <>
      {betChips.map((chipValue, i) => (
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
