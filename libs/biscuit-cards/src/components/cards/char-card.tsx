import {
  standardRanks,
  standardSuitChars,
  standardSuitColors,
} from "../../lib/constants";

interface CharCardProps {
  raw: number;
  suits?: string[];
  ranks?: string[];
}

export const CharCard = (props: CharCardProps) => {
  const { raw, suits = standardSuitChars, ranks = standardRanks } = props;
  const suitIndex = Math.floor(raw / ranks.length);
  const suit = suits[suitIndex];
  const color = standardSuitColors[suitIndex];
  const rank = ranks[raw % ranks.length];
  const cardStr = `${rank}${suit}`;

  return <span style={{ color, margin: "auto" }}>{cardStr}</span>;
};
