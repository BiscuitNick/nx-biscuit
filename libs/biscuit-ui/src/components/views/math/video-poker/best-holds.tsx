import Link from 'next/link';
import { TimeStamp } from '../../../time-stamp';
import { CardRow, CardRowHolds } from '../../../playing-cards';
import {
  getRawsFromStr,
  getMaxEvDraws,
  getDraws,
  handValueTitles,
  getHoldsDiscardString,
} from '@biscuitnick/math';

export const BestHolds = ({ hand }: { hand: string }) => {
  const raws = getRawsFromStr(hand);
  const { holds, ev, cards, discards, payouts } = getMaxEvDraws({ hand: raws });

  const { counts, percents } = getDraws({
    hand: cards,
    discards,
  });

  const possibleHands = Object.entries(counts)
    .filter(([, value]) => value > 0)
    .map(([key]) => key);

  const tableData = Object.entries(counts)
    .filter(([, value]) => value > 0)
    .map(([key]) => [
      handValueTitles[key],
      counts[key],
      percents[key] * 100,
      payouts[key],
      payouts[key] * percents[key],
    ]);

  const totalCount = possibleHands
    .map((x) => counts[x])
    .reduce((a, b) => a + b, 0);
  const totalPercent = possibleHands
    .map((x) => percents[x])
    .reduce((a, b) => a + b, 0);
  const totalEv = possibleHands
    .map((x) => payouts[x] * percents[x])
    .reduce((a, b) => a + b, 0);

  const holdsDiscardString = getHoldsDiscardString(cards, discards);

  return (
    <>
      <h1>Video Poker Hand</h1>
      <CardRowHolds raws={raws} holds={holds} />

      <h1>Best Hold Cards</h1>
      <p>These cards should be held</p>
      <CardRow raws={cards} />

      <h1>Best Discards</h1>
      <p>These cards should be replaced with new draw cards</p>
      <CardRow raws={discards} />

      <h1>Possible Hands</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto auto auto',
          width: '100%',
          overflow: 'auto',
          gap: '0.5rem',
        }}
      >
        <div>Hands</div>
        <div>Counts</div>
        <div>Frequency</div>
        <div>Payout</div>
        <div>Expected Return</div>
        {tableData.map(([hand, count, percent, payout, ev]) => (
          <>
            <div>{hand}</div>
            <div>{count}</div>
            <div>{percent.toPrecision(3)}%</div>
            <div>{payout}</div>
            <div>{ev.toPrecision(4)}</div>
          </>
        ))}

        <div style={{ fontWeight: 'bold' }}>Totals</div>
        <div style={{ fontWeight: 'bold' }}>{totalCount}</div>
        <div style={{ fontWeight: 'bold' }}>
          {(totalPercent * 100).toPrecision(3)}%
        </div>
        <div>-</div>
        <div style={{ fontWeight: 'bold' }}>{totalEv.toPrecision(4)}</div>
      </div>

      <h1>Expected Return (5 Credit Bet) </h1>
      <div>{ev.toPrecision(4)} Credits</div>

      <Link href={`../${holdsDiscardString}`}>{holdsDiscardString}</Link>
      <TimeStamp />
    </>
  );
};
