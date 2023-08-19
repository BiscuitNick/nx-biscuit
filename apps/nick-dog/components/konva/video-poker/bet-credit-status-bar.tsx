import { StatusText } from './status-text';

interface BetCreditStatusBarProps {
  y: number;
  width: number;
  //   height: number;
  textHeight: number;
  fontSize: number;
  strokeWidth: number;

  bet: number;
  credits: number;
}

export const BetCreditStatusBar = (props: BetCreditStatusBarProps) => {
  const { y, width, textHeight, fontSize, strokeWidth, bet, credits } = props;

  //   const textHeight = height * 0.08;
  //   const fontSize = height * 0.05;
  //   const strokeWidth = height * 0.002;

  return (
    <>
      <StatusText
        y={y}
        x={10}
        align={'left'}
        // height={height}
        width={width}
        text={`Bet ${bet}`}
        textHeight={textHeight}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
      />
      <StatusText
        y={y}
        x={-10}
        align={'right'}
        // height={height}
        width={width}
        text={`Credits ${credits}`}
        textHeight={textHeight}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
      />
    </>
  );
};
