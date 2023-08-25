import { NavItemsRow } from '../../navigation';

interface MathPageProps {
  navItems: { name: string; href: string }[];
}

export const MathIndexPage = ({ navItems }: MathPageProps) => {
  return (
    <div>
      <NavItemsRow navItems={navItems} />
    </div>
  );
};
