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
  payScheduleView: 'odds-and-payouts' | 'detailed-odds' | 'payouts-only';
  w2hRatio?: number;
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
    payScheduleView,
    w2hRatio = 1.4,

    // cardMarginFactor = 0.005,
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
    payScheduleView,
    // payScheduleView: 'odds-and-payouts',
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

  const margin = Math.round(width * marginFactor);
  const cardWidth = Math.round((width - margin * 6) / 5);
  const cardHeight = Math.round(cardWidth * w2hRatio);
  const xOffset = cardWidth + margin;
  const cardFontSize = Math.round(cardHeight * 0.2);
  const cardStrokeWidth = Math.round(cardHeight * 0.01);

  const pokerHand = {
    y: Math.round(height * 0.5),
    width,
    margin,
    cardWidth,
    cardHeight,
    xOffset,
    cardFontSize,
    cardStrokeWidth,
    buttonCornerRadius: Math.round(cardHeight * 0.02),
    buttonStrokeWidth: cardStrokeWidth * 2,
    buttonY: cardHeight + margin,
    buttonHeight: Math.round(cardHeight * 0.18),
    buttonTextHeight: Math.round(cardHeight * 0.19),
    buttonFontSize: Math.round(cardHeight * 0.1),
  };

  const bottomButtonRow = {
    y: Math.round(height * 0.93),
    width,
  };

  // const paySchedule = {
  //   width,
  //   height: Math.round(height * 0.4),
  // };

  return {
    paySchedule,
    handStatusBar,
    pokerHand,
    betCreditStatusBar,
    bottomButtonRow,
  };
};
