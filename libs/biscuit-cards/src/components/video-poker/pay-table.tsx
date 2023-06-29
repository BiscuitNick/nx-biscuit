const handTitles = [
  'Royal Flush',
  'Straight Flush',
  'Four of a Kind',
  'Full House',
  'Flush',
  'Straight',
  'Three of a Kind',
  'Two Pair',
  'Jacks or Better',
] as const;

interface PayoutsObject {
  [key: string]: number[];
}

const Payouts: PayoutsObject = {
  'Royal Flush': [250, 500, 750, 1000, 4000],
  'Straight Flush': [50, 100, 150, 200, 250],
  'Four of a Kind': [25, 50, 75, 100, 125],
  'Full House': [9, 18, 27, 36, 45],
  Flush: [6, 12, 18, 24, 30],
  Straight: [4, 8, 12, 16, 20],
  'Three of a Kind': [3, 6, 9, 12, 15],
  'Two Pair': [2, 4, 6, 8, 10],
  'Jacks or Better': [1, 2, 3, 4, 5],
};

interface PayTableProps {
  credits: number;
  hand: string;
}

export const PayTable = ({ credits, hand }: PayTableProps) => {
  const titlesColumn = handTitles.map((title) => (
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
    handTitles.forEach((title, index) => {
      const payout: number = Payouts[title][i];
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
        gridTemplateColumns: 'auto '.repeat(6),
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
    </div>
  );
};
