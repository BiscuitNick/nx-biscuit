import { useEffect } from 'react';
import { useVideoPoker, BottomButtons } from '@nx-biscuit/biscuit-cards';
import { Stage, Layer, Text } from 'react-konva';
import { Background } from './background-rect';
import { PaySchedule } from './pay-schedule';
import { PokerHand } from './poker-hand';
import { StatusText } from './status-text';
import { BottomButtonRow } from './bottom-button-row';

interface VideoPokerCanvasProps {
  width?: number;
  height?: number;
  style?: any;
}

export const VideoPokerCanvas = (props: VideoPokerCanvasProps) => {
  const { width = 500, height = 500, style } = props;
  const {
    bet,
    cards,
    credits,
    handValues,
    handTitles,
    holds,
    payouts,

    status,
    winningHand,
    minusBet,
    betOne,
    betMax,
    dealOrDraw,
    updateHolds,

    winnings,
    setShowOdds,
    ...pokerProps
  } = useVideoPoker({});

  // useEffect(() => {
  //   console.log(cards);
  // }, [cards]);

  useEffect(() => {
    console.log(status, winningHand, winnings, credits);
  }, [status]);

  return (
    <>
      <Stage width={width} height={height} style={style}>
        <Layer>
          <Background width={width} height={height} color={'blue'} />
          <PaySchedule
            width={width}
            height={height * 0.4}
            handValues={handValues}
            handTitles={handTitles}
            payouts={payouts}
            bet={bet}
            winningHand={winningHand}
          />
          <StatusText
            y={height * 0.42}
            align={'center'}
            height={height}
            width={width}
            text={status.includes('dealing') ? 'Dealing...' : winningHand}
          />
          <StatusText
            y={height * 0.42}
            x={-10}
            align={'right'}
            height={height}
            width={width}
            text={
              status === 'pendingNewGame' || status === 'pendingPayouts'
                ? `WIN ${winnings}`
                : ''
            }
          />
          <PokerHand
            y={height * 0.5}
            width={width}
            cards={cards}
            holds={holds}
            updateHolds={updateHolds}
            status={status}
          />
          <StatusText
            y={height * 0.84}
            x={10}
            align={'left'}
            height={height}
            width={width}
            text={`Bet ${bet}`}
          />
          <StatusText
            y={height * 0.84}
            x={-10}
            align={'right'}
            height={height}
            width={width}
            text={`Credits ${credits}`}
          />
          <BottomButtonRow
            y={Math.round(height * 0.93)}
            width={width}
            status={status}
            minusBet={minusBet}
            betOne={betOne}
            betMax={betMax}
            dealOrDraw={dealOrDraw}
          />
        </Layer>
      </Stage>
    </>
  );
};
