import { standardRanks, standardSuits } from '../../lib/constants';

interface CardProps {
  raw: number;
  suits?: string[];
  ranks?: string[];
  // height?: number;
  // width?: number;
}

export const Card = (props: CardProps) => {
  const { raw, suits = standardSuits, ranks = standardRanks } = props;
  const suit = suits[Math.floor(raw / ranks.length)];
  const rank = ranks[raw % ranks.length];
  const cardStr = `${rank}${suit}`;

  return (
    <img className="card-img" src={`/deck/${cardStr}.png`} alt={cardStr} />
  );
};
