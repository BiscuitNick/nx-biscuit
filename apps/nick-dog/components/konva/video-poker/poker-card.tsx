import useImage from 'use-image';
import { Image } from 'react-konva';

const ranks = 'A23456789TJQK';
const suits = 'cdhs';
const getRank = (raw: number) => ranks[raw % 13];
const getSuit = (raw: number) => suits[Math.floor(raw / 13)];
const getCard = (raw: number) => getRank(raw) + getSuit(raw);

interface PokerCardProps {
  width: number;
  height: number;
  raw: number;
  x?: number;
}

export const PokerCard = (props: PokerCardProps) => {
  const { width, height, x = 0, raw } = props;
  const card: string = getCard(raw);
  const [image] = useImage(`/deck/${card}.png`);

  return (
    <Image
      x={x}
      width={width}
      height={height}
      alt={card}
      image={image}
      cornerRadius={height * 0.02}
    />
  );
};

interface PokerCardBackProps {
  width: number;
  height: number;
  color?: string;
  x?: number;
}

export const PokerCardBack = (props: PokerCardBackProps) => {
  const { width, height, color = 'red', x = 0 } = props;
  const [image] = useImage(`/deck/back.png`);

  return (
    <Image
      fill={color}
      x={x}
      width={width}
      height={height}
      alt={'Face Down Card'}
      image={image}
      cornerRadius={height * 0.02}
    />
    
  );
};
