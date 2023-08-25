import { standardRanks, standardSuits } from '@biscuitnick/math';

interface CardProps {
  raw: number;
  suits?: string[];
  ranks?: string[];
}

export const Card = (props: CardProps) => {
  const { raw, suits = standardSuits, ranks = standardRanks } = props;
  const suit = suits[Math.floor(raw / ranks.length)];
  const rank = ranks[raw % ranks.length];
  const cardStr = raw > -1 ? `${rank}${suit}` : 'back';

  return (
    <img className="card-img" src={`/deck/${cardStr}.png`} alt={cardStr} />
  );
};
