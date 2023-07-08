import { useState } from 'react';
import {
  PayoutSchedule,
  handValueTitles,
  handValues,
  valueCounts,
} from '../constants';

interface PayTableProps {
  credits: number;
  hand: string;
  payouts: PayoutSchedule;
  showOdds?: boolean;
  percents: valueCounts;
  counts: valueCounts;
  calculatingOdds: boolean;
}

const oddModes = ['Expected Value', 'Percentages', 'Total Occurences'];

export const PayTable = ({
  credits,
  hand,
  payouts,
  showOdds,
  percents,
  counts,
  calculatingOdds,
}: PayTableProps) => {
  const [oddsMode, setOddsMode] = useState<string>(oddModes[0]);

  const titlesColumn = handValues.map((val: string) => (
    <div
      className="pay-table-cell left"
      key={val}
      style={{
        color: handValueTitles[val] === hand ? 'white' : 'yellow',
      }}
    >
      {handValueTitles[val].toUpperCase()}
    </div>
  ));
  const payoutsColumns = [];

  for (let i = 0; i < 5; i++) {
    const payoutsColumn: JSX.Element[] = [];
    handValues.forEach((val, index) => {
      const payout: number = payouts[val][i];
      const title: string = handValueTitles[val];
      payoutsColumn.push(
        <div
          className="pay-table-cell"
          style={{
            color: i + 1 === credits && title === hand ? 'white' : 'yellow',
          }}
          key={index}
        >
          {payout > 0 ? payout : '-'}
        </div>
      );
    });
    if (showOdds) {
      payoutsColumn.push(
        <div key="odds-cell" className="pay-table-cell"></div>
      );
    }
    payoutsColumns.push(
      <div
        className="pay-table-column"
        key={i}
        style={{
          background: i + 1 === credits ? '#d90e29' : '#2c2c2c',
        }}
      >
        {payoutsColumn}
      </div>
    );
  }

  let total = 0;

  const oddsColumn: JSX.Element[] = handValues.map((val: string, i) => {
    if (calculatingOdds) {
      return (
        <div className="pay-table-cell" key={i}>
          .........
        </div>
      );
    }
    if (oddsMode === 'Expected Value') {
      const payoutCredits = payouts[val][credits - 1] || 0;
      const ev = percents[val] * payoutCredits;
      total += ev;

      return (
        <div className="pay-table-cell" key={i}>
          {ev > 0 ? ev.toPrecision(3) : '-'}
        </div>
      );
    } else if (oddsMode === 'Percentages') {
      const percent = percents[val] * 100;
      total += percent;

      return (
        <div className="pay-table-cell" key={i}>
          {percent > 0 ? `${percent.toPrecision(3)}%` : '-'}
        </div>
      );
    } else if (oddsMode === 'Total Occurences') {
      const count = counts[val];
      total += count;

      return (
        <div className="pay-table-cell" key={i}>
          {count > 0 ? count : '-'}
        </div>
      );
    } else {
      return <div className="pay-table-cell" key={i}></div>;
    }
  });

  if (showOdds) {
    titlesColumn.push(
      <div key="ev-title" className="pay-table-cell left">
        {oddsMode}
      </div>
    );
    oddsColumn.push(
      <div key="ev-total" className="pay-table-cell">
        {calculatingOdds
          ? '.........'
          : total > 0
          ? oddsMode === 'Expected Value'
            ? total.toPrecision(3)
            : oddsMode === 'Percentages'
            ? `${total.toPrecision(3)}%`
            : oddsMode === 'Total Occurences'
            ? total
            : '-'
          : '-'}
      </div>
    );
  }

  return (
    <div
      className="pay-table"
      style={{
        gridTemplateColumns: `auto repeat(${showOdds ? 6 : 5}, 1fr)`,
      }}
    >
      <div className="pay-table-column">{titlesColumn}</div>
      {payoutsColumns}
      {showOdds && (
        <div
          className="pay-table-column"
          onClick={() => {
            const index = oddModes.indexOf(oddsMode);
            const newIndex = index + 1 >= oddModes.length ? 0 : index + 1;
            const newMode = oddModes[newIndex];
            setOddsMode(newMode);
          }}
        >
          {oddsColumn}
        </div>
      )}
    </div>
  );
};
