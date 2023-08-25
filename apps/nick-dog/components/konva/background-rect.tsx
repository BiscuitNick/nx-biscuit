import { Rect } from 'react-konva';

interface BackgroundProps {
  width: number;
  height: number;
  color?: string;
}

export const Background = ({
  width,
  height,
  color = 'blue',
}: BackgroundProps) => {
  return <Rect fill={color} width={width} height={height} />;
};
