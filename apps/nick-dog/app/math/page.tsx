import { MathIndexPage } from '@biscuitnick/biscuit-ui';

const navItems = [{ name: 'Jack Or Better', href: '/math/jacks-or-better' }];

export default function Page() {
  return <MathIndexPage navItems={navItems} />;
}
