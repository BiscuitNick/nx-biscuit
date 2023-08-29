import Link from 'next/link';

interface NavProps {
  selectedItem?: string;
  navItems: { name: string; href: string }[];
}

export const NavItemsRow = (props: NavProps) => {
  const { selectedItem = '', navItems } = props;
  return (
    <nav className="my-2 flex flex-row space-x-2">
      {navItems.map((item, i) => (
        <Link key={item.href} href={item.href}>
          <ul className={`flex items-center justify-center gap-4 text-sm`}>
            {item.name}
          </ul>
        </Link>
      ))}
    </nav>
  );
};
