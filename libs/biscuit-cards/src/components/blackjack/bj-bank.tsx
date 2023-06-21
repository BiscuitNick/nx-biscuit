import { useSpring, animated } from "@react-spring/web";

const chipsValues = [500, 100, 25, 5, 1];

interface PlayerBankProps {
  bank: number;
  playerId: string;
  handleBet: (bet: number, playerId: string) => void;
}

export const BlackjackBank = (props: PlayerBankProps) => {
  const { bank, playerId, handleBet } = props;

  const { val } = useSpring({ val: bank });

  return (
    <div className="bank-container">
      <div className="chips-container">
        {chipsValues.map((chipValue, i) => {
          // return chipValue;
          return bank >= chipValue ? (
            <img
              alt={`$${chipValue}`}
              src={`/chips/${chipValue}.png`}
              key={i}
              className="bank-chip"
              onClick={() => {
                handleBet(chipValue, playerId);
              }}
            />
          ) : (
            <div key={i} />
          );
        })}
      </div>
      <animated.div
        style={{
          margin: "auto",
          color: "white",
          textShadow: "1px 1px 1px black",
          fontSize: "x-large",
        }}
      >
        {val.to((val) => `$${Math.floor(val)}`)}
      </animated.div>
    </div>
  );
};
