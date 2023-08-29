import { JacksOrBetterPage } from '@biscuitnick/biscuit-ui';

const navItems = [{ name: 'Play', href: '/games/video-poker' }];

export default function Page() {
  return <JacksOrBetterPage navItems={navItems} />;
}
