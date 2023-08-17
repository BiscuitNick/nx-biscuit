export const usePayScheduleDimensions = (props: {
  width: number;
  height: number;
  marginFactor: number;
  textMarginFactor: number;
  handTitles: string[];
  strokeWidthFactor?: number;
  expectedValues?: any;
  payouts?: any;
  payScheduleView?: 'odds-and-payouts' | 'detailed-odds' | 'payouts-only';
  handValues: any;
  ev: number;
  percents: any;
  counts: any;
  bet: number;
}) => {
  const {
    width,
    height,
    marginFactor,
    textMarginFactor,
    handTitles: _handTitles,
    strokeWidthFactor = 0.0025,
    payScheduleView = 'detailed-odds',
    payouts,
    handValues,
    expectedValues,
    counts,
    percents,
    bet = 5,
    ev,
  } = props;
  const margin = width * marginFactor;
  const adjustedWidth = Math.round(width - margin * 2);
  const strokeWidth = Math.round(adjustedWidth * strokeWidthFactor);

  // const paySheduleView = 'detailed-odds'; //, 'odds-only', 'payouts-only'
  // const showOdds = paySheduleView.includes('odds');

  const handTitles =
    payScheduleView === 'odds-and-payouts'
      ? [..._handTitles, 'Totals']
      : payScheduleView === 'detailed-odds'
      ? ['Hands', ..._handTitles, 'Totals']
      : _handTitles;

  const rows = handTitles.length;
  const columns =
    payScheduleView === 'odds-and-payouts'
      ? 6
      : payScheduleView === 'detailed-odds'
      ? 4
      : 5;

  const fontMargin = Math.floor((height * textMarginFactor) / rows);
  const fontSize = Math.floor((height - fontMargin * rows) / rows);
  const longestTitle = Math.max(...handTitles.map((el) => el.length));
  const baseWidth = Math.round(longestTitle * fontSize * 0.7);

  const boxWidth = Math.round((adjustedWidth - baseWidth) / columns);
  // const boxes = [[0, 108]];

  const boxes = [];

  for (let i = 0; i < columns; i++) {
    const bw =
      i < columns - 1
        ? boxWidth
        : adjustedWidth - baseWidth - boxWidth * (columns - 1);
    const box = [baseWidth + boxWidth * i, bw];

    boxes.push(box);
  }

  let texts = [handTitles];
  if (payScheduleView === 'odds-and-payouts') {
    const bet1 = handValues.map((hand: string) => payouts[hand][0]);
    const bet2 = handValues.map((hand: string) => payouts[hand][1]);
    const bet3 = handValues.map((hand: string) => payouts[hand][2]);
    const bet4 = handValues.map((hand: string) => payouts[hand][3]);
    const bet5 = handValues.map((hand: string) => payouts[hand][4]);
    const evCol = handValues.map((hand: string) =>
      Number(expectedValues[hand].toPrecision(3))
    );

    texts = [
      ...texts,
      bet1,
      bet2,
      bet3,
      bet4,
      bet5,
      [...evCol, Number(ev.toPrecision(3))],
    ];
  } else if (payScheduleView === 'detailed-odds') {
    const bet1 = handValues.map((hand: string) => payouts[hand][bet - 1]);

    const countsCol = handValues.map((hand: string) => counts[hand]);
    const percentsCol = handValues.map((hand: string) =>
      percents[hand] > 0 ? (percents[hand] * 100).toPrecision(3) + '%' : '-'
    );

    const countTotal = countsCol.reduce((a: number, b: number) => a + b, 0);
    // const frequencyTotal = percentsCol.reduce(
    //   (a: number, b: number) => a + b,
    //   0
    // );

    const evCol = handValues.map((hand: string) =>
      Number(expectedValues[hand].toPrecision(3))
    );
    // const evTotal = evCol.reduce((a: number, b: number) => a + b, 0);

    texts = [
      ...texts,
      [`Bet ${bet} Payouts`, ...bet1],
      ['Occurences', ...countsCol, countTotal],
      ['Frequency', ...percentsCol, '100%'],
      ['Expected Value', ...evCol, Number(ev.toPrecision(3))],
    ];

    // const bet1 = handValues.map((hand: string) => payouts[hand][i]);
    // console.log(bet1);
  } else {
    const bet1 = handValues.map((hand: string) => payouts[hand][0]);
    const bet2 = handValues.map((hand: string) => payouts[hand][1]);
    const bet3 = handValues.map((hand: string) => payouts[hand][2]);
    const bet4 = handValues.map((hand: string) => payouts[hand][3]);
    const bet5 = handValues.map((hand: string) => payouts[hand][4]);
    // const evCol = handValues.map((hand: string) =>
    //   Number(expectedValues[hand].toPrecision(3))
    // );

    texts = [
      ...texts,
      bet1,
      bet2,
      bet3,
      bet4,
      bet5,
      // [...evCol, Number(ev.toPrecision(3))],
    ];
  }

  // console.log(texts);

  // const texts = odds - and - payouts[(handTitles, payouts)];

  return {
    adjustedWidth,
    fontSize,
    fontMargin,
    boxes,
    margin,
    strokeWidth,
    width,
    height,
    handTitles,
    texts,
  };
};
