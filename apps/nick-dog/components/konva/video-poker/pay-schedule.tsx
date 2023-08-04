/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { PayoutSchedule } from '@nx-biscuit/biscuit-cards';
import { Group, Rect, Text, Line } from 'react-konva';
import { useStepContext } from '@mui/material';

interface PayScheduleProps {
  width: number;
  height: number;
  payouts: PayoutSchedule;
  handValues: string[];
  handTitles: string[];

  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  marginFactor?: number;
  textMarginFactor?: number;

  bet?: number;
  winningHand?: string;
  // hand?: string;
  // showOdds?: boolean;
  // percents?: valueCounts;
  // counts?: valueCounts;
  // calculatingOdds?: boolean;
}

const usePayScheduleDimensions = (props: {
  width: number;
  height: number;
  marginFactor: number;
  textMarginFactor: number;
  handTitles: string[];
}) => {
  const { width, height, marginFactor, textMarginFactor, handTitles } = props;
  const [fontSize, setFontSize] = useState(0);
  const [fontMargin, setFontMargin] = useState(0);
  const [lineXs, setLineXs] = useState<number[]>([]);
  const [boxes, setBoxes] = useState<number[][]>([]);
  const margin = width * marginFactor;
  const adjustedWidth = Math.round(width - margin * 2);
  const strokeWidth = 2;

  useEffect(() => {
    const _fontMargin = Math.floor(
      (height * textMarginFactor) / handTitles.length
    );
    const _fontSize = Math.floor(
      (height - _fontMargin * handTitles.length) / handTitles.length
    );
    const longestTitle = Math.max(...handTitles.map((el) => el.length));
    const baseWidth = Math.round(longestTitle * _fontSize * 0.7);
    const boxWidth = Math.round((adjustedWidth - baseWidth) / 5);
    const _boxes = [];

    for (let i = 0; i < 5; i++) {
      const bw = i < 4 ? boxWidth : adjustedWidth - baseWidth - boxWidth * 4;
      const box = [baseWidth + boxWidth * i, bw];
      _boxes.push(box);
    }

    setFontSize(_fontSize);
    setFontMargin(_fontMargin);
    setLineXs([
      baseWidth,
      baseWidth + boxWidth,
      baseWidth + boxWidth * 2,
      baseWidth + boxWidth * 3,
      baseWidth + boxWidth * 4,
    ]);
    setBoxes(_boxes);
  }, [handTitles.length, height]);

  return {
    adjustedWidth,
    fontSize,
    fontMargin,
    boxes,
    lineXs,
    margin,
    strokeWidth,
  };
};

export const PaySchedule = (props: PayScheduleProps) => {
  const {
    width,
    height,
    handTitles,
    bet = 1,
    marginFactor = 0.01,
    textMarginFactor = 0.4,

    payouts,
    handValues,
    backgroundColor = '#2c2c2c',
    textColor = 'yellow',
    borderColor = 'yellow',

    winningHand = '',
  } = props;
  const { adjustedWidth, boxes, fontSize, fontMargin, margin, strokeWidth } =
    usePayScheduleDimensions({
      width,
      height,
      marginFactor,
      textMarginFactor,
      handTitles,
    });

  return (
    <Group x={margin} y={margin}>
      <Rect
        strokeWidth={strokeWidth}
        fill={backgroundColor}
        width={adjustedWidth}
        height={height}
        stroke={borderColor}
      />
      <Group x={fontMargin / 2} y={fontMargin}>
        {handTitles.map((title: string, index: number) => (
          <Text
            key={index}
            text={winningHand === title ? title.toUpperCase() : title}
            fill={textColor}
            fontStyle={winningHand === title ? 'bold' : 'normal'}
            fontSize={fontSize}
            y={index * (fontSize + fontMargin)}
          />
        ))}
      </Group>
      {boxes.map((box: number[], index: number) => (
        <Group x={box[0]} key={index}>
          <Rect
            x={0}
            y={0}
            width={box[1]}
            height={height}
            stroke={borderColor}
            strokeWidth={strokeWidth}
            fill={index === bet - 1 ? 'red' : ''}
          />
          <Group x={fontMargin / 2} y={fontMargin}>
            {handValues.map((title: string, i: number) => {
              const txt = String(payouts[title][index]);
              return (
                <Text
                  key={i}
                  text={txt}
                  fill={textColor}
                  fontSize={fontSize}
                  y={i * (fontSize + fontMargin)}
                />
              );
            })}
          </Group>
        </Group>
      ))}
    </Group>
  );
};
