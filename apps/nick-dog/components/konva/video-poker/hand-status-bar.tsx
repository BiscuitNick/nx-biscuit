import { StatusText } from './status-text';

interface HandStatusBarProps {
  y: number;
  width: number;

//   height: number;
  textHeight: number;
  fontSize: number;
  strokeWidth: number;

  status: string;
  winningHand: string;
  winnings: number;
}

export const HandStatusBar = (props: HandStatusBarProps) => {
  const {
    y,
    width,
    // height,
    status,
    winningHand,
    winnings,
    textHeight,
    fontSize,
    strokeWidth,
  } = props;

//   const textHeight = height * 0.08;
//   const fontSize = height * 0.05;
//   const strokeWidth = height * 0.002;

  return (
    <>
      <StatusText
        y={y}
        align={'center'}
        width={width}
        text={status.includes('dealing') ? 'Dealing...' : winningHand}
        textHeight={textHeight}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
      />
      <StatusText
        y={y}
        x={-10}
        align={'right'}
        width={width}
        text={
          status === 'pendingNewGame' || status === 'pendingPayouts'
            ? `WIN ${winnings}`
            : ''
        }
        textHeight={textHeight}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
      />
    </>
  );
};
