import { Background } from '../background-rect';
import { PaySchedule } from './pay-schedule';
import { PokerHand } from './poker-hand';
import { BottomButtonRow } from './bottom-button-row';
import { HandStatusBar } from './hand-status-bar';
import { BetCreditStatusBar } from './bet-credit-status-bar';

export const VideoPokerCanvas = (props: any) => {
  const {
    width,
    height,
    paySchedule,
    handStatusBar,
    pokerHand,
    betCreditStatusBar,
    bottomButtonRow,
  } = props;

  return (
    <>
      <Background width={width} height={height} color={'blue'} />
      <PaySchedule {...paySchedule} />
      <HandStatusBar {...handStatusBar} />
      <PokerHand {...pokerHand} />
      <BetCreditStatusBar {...betCreditStatusBar} />
      <BottomButtonRow {...bottomButtonRow} />
    </>
  );
};
