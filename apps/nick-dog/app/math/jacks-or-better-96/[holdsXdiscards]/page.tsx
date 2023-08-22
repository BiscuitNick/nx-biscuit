// import { Card } from '@nx-biscuit/biscuit-cards';
import { Card } from '../../../../components/card'; // Copied from '@nx-biscuit/biscuit-cards' (Error if using as server component);

import {
  // getRanks,
  // getSuitCounts,
  getTotalCombinations,
  getFilteredDeck,
} from '@biscuitnick/math';

const timeStamp = new Date();
const dateStr = timeStamp.toLocaleDateString();
const timeStr = timeStamp.toLocaleTimeString();

export default function Page({
  params,
}: {
  params: { holdsXdiscards: string };
}) {
  const [holdsStr, discardsStr] = params.holdsXdiscards.split('x');
  const holds = holdsStr.split('-').map((x) => Number(x));
  const discards = discardsStr
    .split('-')
    .map((x) => (x.length ? Number(x) : -1))
    .filter((x) => x > -1);
  const deck = getFilteredDeck({ hand: holds, discards });
  const totalCombinations = getTotalCombinations(deck.length, 5 - holds.length);

  // const { kickers, pairs, trips, quads } = getRanks(holds);
  // const totalSuits = getSuitCounts(holds).filter((x) => x > 0);

  // console.log(kickers, pairs, trips, quads);
  // console.log(totalSuits);
  // console.log(deck);

  // console.log(31, discardsStr, discards);

  // const isTrips = trips.length > 0;
  // const isPair = pairs.length === 1;
  // const isTwoPair = pairs.length === 2;
  // const isQuads = quads.length > 0;

  return (
    <div
      className="text-white"
      style={{ display: 'grid', gridGap: 10, padding: '2em' }}
    >
      <div>Hold Cards</div>
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          //   width: holds.length * 100,

          gridTemplateColumns: '100px 100px 100px 100px 100px',
          gridGap: 10,
        }}
      >
        {holds.map((x, i) => (
          <div key={i} style={{ width: 100, height: 140 }}>
            <Card raw={x} />
          </div>
        ))}
      </div>
      <div>Discard Cards</div>
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: '100px 100px 100px 100px 100px',
          gridGap: 10,
        }}
      >
        {discards.map((x, i) => (
          <div key={i} style={{ width: 100, height: 140 }}>
            <Card raw={x} />
          </div>
        ))}
      </div>
      <div>Unique Draws Combinations</div>
      <div>{totalCombinations}</div>
      <div>Remaining cards to choose from = {deck.length}</div>

      <div>Flush</div>

      <div>Straight</div>

      <div
        style={{
          bottom: 0,
          right: 5,
          position: 'absolute',
          // width: '100%',
          display: 'grid',
          // background: 'orange',
        }}
      >
        <div>
          Page Created {dateStr} {timeStr}
        </div>
      </div>
    </div>
  );
}
