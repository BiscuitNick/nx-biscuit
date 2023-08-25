import Link from 'next/link';
import { getTotalCombinations, getFilteredDeck } from '@biscuitnick/math';
export const TotalPossibleDraws = ({
  holds,
  discards,
}: {
  holds: number[];
  discards: number[];
}) => {
  const deck = getFilteredDeck({ hand: holds, discards });

  const n = deck.length;
  const k = 5 - holds.length;

  const totalCombinations = getTotalCombinations(n, k);

  return (
    <div>
      <h1 style={{ fontSize: 'larger', fontWeight: 'bold' }}>Possible Draws</h1>
      <p>
        We can calculate the total unique draws using the{' '}
        <Link
          href="https://en.wikipedia.org/wiki/Combination"
          style={{ textDecoration: 'underline' }}
        >
          combination
        </Link>{' '}
        formula:
      </p>
      <p>nCk = n! / (k! * (n - k)!)</p> <br />
      <p>
        n is the number of unique items we are choosing from and is equal to the
        number of cards remaining in the deck. There are 52 cards in a standard
        deck. We remove from this total, the total number of cards we are
        holding ({holds.length}) and discarding ({discards.length}).
        <br />n = 52 - {holds.length} - {discards.length} <br />n = {n}
      </p>
      <br />
      <p>
        k is the number of items we are choosing. This will equal the target
        length of our hand (5) - the number of cards we are holding (
        {holds.length}).
      </p>
      <p>k = 5 - {holds.length}</p>
      <p>k = {k}</p>
      <br />
      <p>Our formula becomes:</p>
      <p>
        {n}C{k} = {n}! / ({k}! * {n - k}!) = {totalCombinations}
      </p>
      <br />
      <p>Total Possible Draws = {totalCombinations}</p>
      <br />
      <p>
        Our total possible combinations of {totalCombinations} will be used for
        in the denominator when calculating the probability for individiual hand
        types below.
      </p>
    </div>
  );
};
