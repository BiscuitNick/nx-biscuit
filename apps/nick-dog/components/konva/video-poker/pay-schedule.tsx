import { PayoutSchedule } from '@biscuitnick/math';

import { Group, Rect, Text } from 'react-konva';
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
  handTitle?: string;

  expectedValues?: any;
  ev?: number;
  // percents?: any;
  // counts?: any;
  // hand?: string;
  // showOdds?: boolean;
  // percents?: valueCounts;
  // counts?: valueCounts;
  // calculatingOdds?: boolean;

  adjustedWidth: number;
  boxes: number[][];
  fontMargin: number;
  fontSize: number;
  margin: number;
  strokeWidth: number;
  texts: any;
  payScheduleView?: 'odds-and-payouts' | 'detailed-odds' | 'payouts-only';
}

export const PaySchedule = (props: PayScheduleProps) => {
  const {
    // width,
    height,
    handTitles,
    bet = 1,
    // marginFactor = 0.01,
    // textMarginFactor = 0.4,

    payouts,
    handValues,
    backgroundColor = '#2c2c2c',
    textColor = 'yellow',
    borderColor = 'yellow',

    handTitle = '',

    expectedValues = [],
    ev,
    margin,
    strokeWidth,
    adjustedWidth,
    fontMargin,
    fontSize,
    boxes,
    texts,
    payScheduleView,
  } = props;

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
        {texts[0].map((title: string, index: number) => (
          <Text
            key={index}
            text={handTitle === title ? title.toUpperCase() : title}
            fill={
              index === 0 && payScheduleView === 'detailed-odds'
                ? 'white'
                : index === texts[0].length - 1 &&
                  (payScheduleView === 'detailed-odds' ||
                    payScheduleView === 'odds-and-payouts')
                ? 'white'
                : textColor
            }
            fontStyle={handTitle === title ? 'bold' : 'normal'}
            fontSize={fontSize}
            y={Math.floor(index * (fontSize + fontMargin))}
            // verticalAlign="middle"
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
            fill={
              index === bet - 1 && payScheduleView !== 'detailed-odds'
                ? 'red'
                : ''
            }
          />
          <Group x={fontMargin / 2} y={fontMargin}>
            {texts[index + 1].map((text: string, i: number) => {
              // const txt =
              //   index < 5
              //     ? payouts[title][index]
              //     : expectedValues[Number(title)].toPrecision(3);

              return (
                <Text
                  key={i}
                  text={String(text)}
                  fill={
                    i === 0 && payScheduleView === 'detailed-odds'
                      ? 'white'
                      : textColor
                  }
                  fontSize={fontSize}
                  y={i * (fontSize + fontMargin)}
                />
              );
            })}

            {/* {index === 5 ? (
              <Text
                text={String(ev?.toPrecision(3))}
                fill={textColor}
                fontSize={fontSize}
                y={handValues.length * (fontSize + fontMargin)}
              />
            ) : null} */}
          </Group>
        </Group>
      ))}
    </Group>
  );
};
