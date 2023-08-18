import { StatusText } from './status-text';

interface HandStatusBarProps {
  // Size & Positioning
  fontSize: number;
  strokeWidth: number;
  textHeight: number;
  width: number;
  y: number;

  // Content
  handTitle: string;
  status: string;
  winnings: number;
}

export const HandStatusBar = (props: HandStatusBarProps) => {
  const {
    // Size & Positioning
    fontSize,
    strokeWidth,
    textHeight,
    width,
    y,

    // Content
    status,
    handTitle,
    winnings,
  } = props;

  return (
    <>
      <StatusText
        y={y}
        align={'center'}
        width={width}
        text={status.includes('dealing') ? 'Dealing...' : handTitle}
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
