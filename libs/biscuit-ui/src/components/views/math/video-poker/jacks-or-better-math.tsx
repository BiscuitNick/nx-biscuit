import { NavItemsRow } from '../../../navigation';

interface JackOrBetterMathProps {
  navItems: { name: string; href: string }[];
}

export const JacksOrBetterPage = ({ navItems }: JackOrBetterMathProps) => {
  return (
    <div>
      <NavItemsRow navItems={navItems} />
    </div>
  );
};
