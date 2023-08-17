import { usePayScheduleDimensions } from './use-pay-schedule-dimensions';
interface useVideoPokerDimensionsProps {
  width: number;
  height: number;
  marginFactor?: number;
  textMarginFactor?: number;
  handTitles: string[];
  payouts: any;
  handValues: any;
  bet: number;
  expectedValues: any;
  ev: number;
  percents: any;
  counts: any;
}

export const useVideoPokerDimensions = (
  props: useVideoPokerDimensionsProps
) => {
  const {
    width,
    height,
    handTitles,
    marginFactor = 0.01,
    textMarginFactor = 0.35,
    payouts,
    handValues,
    bet,
    expectedValues,
    ev,
    percents,
    counts,
  } = props;

  const paySchedule = usePayScheduleDimensions({
    width,
    height: Math.round(height * 0.4),
    marginFactor, //: 0.01,
    textMarginFactor, //: 0.4,
    handTitles,
    payouts,
    handValues,
    expectedValues,
    ev,
    bet,

    percents,
    counts,
  });

  const statusBarFontSize = Math.round(height * 0.05);
  const statusBarTextHeight = Math.round(height * 0.08);
  const statusBarStrokeWidth = Math.round(height * 0.002);

  const handStatusY = Math.round(height * 0.42);
  const betCreditStatusY = Math.round(height * 0.84);

  const handStatusBar = {
    fontSize: statusBarFontSize,
    strokeWidth: statusBarStrokeWidth,
    textHeight: statusBarTextHeight,
    width,
    y: handStatusY,
  };
  const betCreditStatusBar = {
    textHeight: statusBarTextHeight,
    fontSize: statusBarFontSize,
    strokeWidth: statusBarStrokeWidth,
    width,
    y: betCreditStatusY,
  };

  // const paySchedule = {
  //   width,
  //   height: Math.round(height * 0.4),
  // };

  return { handStatusBar, betCreditStatusBar, paySchedule };
};
