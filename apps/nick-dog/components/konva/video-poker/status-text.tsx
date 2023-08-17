import { Text } from 'react-konva';

interface StatusTextProps {
  // height: number;
  width: number;
  text: string;
  y: number;
  align: string;

  //
  textHeight: number;
  fontSize: number;
  strokeWidth: number;

  x?: number;
  fill?: string;
  fontStyle?: string;
  stroke?: string;
}

export const StatusText = ({
  // height,
  width,
  text,
  y,
  align,

  textHeight,
  fontSize,
  strokeWidth,

  x = 0,
  fill = 'red',
  stroke = 'yellow',
  fontStyle = 'bold',
}: StatusTextProps) => {
  return (
    <Text
      x={x}
      y={y}
      height={textHeight}
      width={width}
      // height={height * 0.08}
      // strokeWidth={height * 0.002}
      // fontSize={height * 0.05}
      align={align}
      fontSize={fontSize}
      strokeWidth={strokeWidth}
      text={text}
      verticalAlign="middle"
      fontStyle={fontStyle}
      fill={fill}
      stroke={stroke}
    />
  );
};
