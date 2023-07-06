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
  odds: valueCounts;
}

export const PayTable = ({
  credits,
  hand,
  payouts,
  showOdds,
  odds,
}: PayTableProps) => {
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
      payoutsColumn.push(<div className="pay-table-cell"></div>);
    }
    payoutsColumns.push(
      <div
        key={i}
        style={{
          display: 'grid',
          textAlign: 'right',
          border: '1px yellow solid',
          padding: 5,

          background: i + 1 === credits ? '#d90e29' : '#2c2c2c',
        }}
      >
        {payoutsColumn}
      </div>
    );
  }

  let netEv = 0;

  const oddsColumn: JSX.Element[] = handValues.map((val: string, i) => {
    const payoutCredits = payouts[val][credits - 1] || 0;
    const ev = odds[val] * payoutCredits;
    netEv += ev;

    return (
      <div className="pay-table-cell" key={i}>
        {ev > 0 ? ev.toFixed(4) : '-'}
      </div>
    );
  });

  if (showOdds) {
    titlesColumn.push(
      <div className="pay-table-cell left">Expected Value</div>
    );
    oddsColumn.push(
      <div className="pay-table-cell">{netEv > 0 ? netEv.toFixed(4) : '-'}</div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridAutoFlow: 'column',
        // gridTemplateColumns: 'auto '.repeat(showOdds ? 7 : 6),
        width: '100%',
        background: '#2c2c2c',
        border: 'yellow 1px solid',
        // padding: 10,

        color: 'yellow',
        margin: 'auto',

        marginTop: 10,
      }}
    >
      <div
        style={{
          display: 'grid',
          border: '1px yellow solid',
          padding: 5,
        }}
      >
        {titlesColumn}
      </div>
      {payoutsColumns}
      {showOdds && (
        <div
          style={{
            display: 'grid',
            border: '1px yellow solid',
            padding: 5,
          }}
        >
          {oddsColumn}
        </div>
      )}
    </div>
  );
};
