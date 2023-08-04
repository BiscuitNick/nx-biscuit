import { Text } from 'react-konva';

export const StatusText = ({
  height,
  width,
  text,
  y,
  align,
  x = 0,
}: {
  height: number;
  width: number;
  text: string;
  y: number;
  align: string;
  x?: number;
}) => {
  return (
    <Text
      y={y}
      x={x}
      height={height * 0.08}
      width={width}
      align={align}
      verticalAlign="middle"
      fontSize={height * 0.05}
      fontStyle="bold"
      fill="red"
      stroke="yellow"
      strokeWidth={height * 0.002}
      text={text}
    />
  );
};
