import { NextResponse } from 'next/server';
import { drawCombinationValues } from '@biscuitnick/math';

export async function GET(request: Request) {
  return NextResponse.json('This api method only accepts POST requests.');
}

export async function POST(request: Request) {
  const { holdCards, muckCards } = await request.json();
  const deck = [...Array(52).keys()].filter(
    (raw) => !holdCards.includes(raw) && !muckCards.includes(raw)
  );
  const { counts, percents } = drawCombinationValues(holdCards, deck);

  return NextResponse.json({ counts, percents });
}
