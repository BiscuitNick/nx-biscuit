import { BestHolds } from '@biscuitnick/biscuit-ui';

export default function Page({
  params: { hand },
}: {
  params: { hand: string };
}) {
  return <BestHolds hand={hand} />;
}
