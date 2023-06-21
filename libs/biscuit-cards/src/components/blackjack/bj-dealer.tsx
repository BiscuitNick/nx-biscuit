import { getBlackJackHandTotal } from "../../lib/getRank";
import { BlackjackCard } from "../cards/bj-card";

interface DealerHandProps {
  cards: { raw: number; show: boolean; exit: boolean }[];
  gameStatus: string;
}

export const BlackjackDealer = (props: DealerHandProps) => {
  const { cards, gameStatus } = props;
  const dealerTotal = getBlackJackHandTotal(
    cards.filter((x) => x.show).map((x) => x.raw)
  );

  const containerWidth = 300;
  const width = 105;
  const xOffSet = containerWidth / 2 - width;
  const gap = cards.length < 3 ? width : width / (cards.length - 1);

  return (
    <div className="player-container">
      <div className="card-container">
        {cards.map((card, i) => (
          <BlackjackCard
            index={i}
            key={i}
            {...card}
            xOffSet={xOffSet}
            gap={gap}
            yOffSet={gameStatus === "dealerBlackJackCheck" && i === 0 ? -10 : 0}
          />
        ))}
      </div>
      <div className="total-text">{dealerTotal > 0 ? dealerTotal : null}</div>
    </div>
  );
};
