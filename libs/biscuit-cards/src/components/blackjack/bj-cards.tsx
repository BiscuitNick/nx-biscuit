import { BlackjackCard } from "../cards/bj-card";

interface BlackjackCardsProps {
  cards: { raw: number; show: boolean; exit: boolean }[];
}

export const BlackjackCards = (props: BlackjackCardsProps) => {
  const { cards } = props;

  const containerWidth = 300;
  const width = 105;
  const xOffSet = containerWidth / 2 - width;
  const gap = cards.length < 3 ? width : width / (cards.length - 1);

  const hand = cards.map((card, i) => (
    <BlackjackCard key={i} index={i} {...card} gap={gap} xOffSet={xOffSet} />
  ));

  return <div className="card-container">{hand}</div>;
};
