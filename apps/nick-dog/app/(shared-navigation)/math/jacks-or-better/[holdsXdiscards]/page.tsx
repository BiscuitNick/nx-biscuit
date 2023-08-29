// import { Card } from '@nx-biscuit/biscuit-cards';
// import Link from 'next/link';
import {
  CardRow,
  TimeStamp,
  TotalPossibleDraws,
  HandProbabilities,
} from '@biscuitnick/biscuit-ui';

import { getRawsFromStr } from '@biscuitnick/math';

// const getRawsFromStr = (str: string) => {
//   const [holdsStr, discardsStr] = str.split('x');
// };

export default function Page({
  params: { holdsXdiscards },
}: {
  params: { holdsXdiscards: string };
}) {
  if (!holdsXdiscards.includes('x')) {
    return <div>Invalid Parameter</div>;
  }

  const [holdsStr, discardsStr] = holdsXdiscards.split('x');

  const holds = getRawsFromStr(holdsStr);
  const discards = getRawsFromStr(discardsStr);

  return (
    <>
      <div>Hold Cards:</div>
      <CardRow raws={holds} />
      <div>Discards:</div>
      <CardRow raws={discards} />
      <TotalPossibleDraws holds={holds} discards={discards} />
      <HandProbabilities />
      <TimeStamp />
    </>
  );
}
