import { PayoutSchedule } from './constants';

interface PayTableProps {
  credits: number;
  hand: string;
  payouts: PayoutSchedule;
  showOdds?: boolean;
}

export const PayTable = ({
  credits,
  hand,
  payouts,
  showOdds,
}: PayTableProps) => {
  const titlesColumn = Object.keys(payouts).map((title) => (
    <div
      key={title}
      style={{
        color: title === hand ? 'white' : 'yellow',
      }}
    >
      {title.toUpperCase()}
    </div>
  ));
  const payoutsColumns = [];

  for (let i = 0; i < 5; i++) {
    const payoutsColumn: JSX.Element[] = [];
    Object.keys(payouts).forEach((title, index) => {
      const payout: number = payouts[title][i];
      payoutsColumn.push(
        <div
          style={{
            color: i + 1 === credits && title === hand ? 'white' : 'yellow',
          }}
          key={index}
        >
          {payout}
        </div>
      );
    });
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

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto '.repeat(showOdds ? 7 : 6),
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
        <>
          <div>odds</div>
        </>
      )}
    </div>
  );
};
