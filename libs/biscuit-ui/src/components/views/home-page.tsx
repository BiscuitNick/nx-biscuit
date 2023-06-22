import '../../styles/global.css';
import Link from 'next/link';
import { FadeRightLine, FadeLeftLine } from '../lines';
import { GradientTitleText } from '../texts';

interface HomePageProps {
  title: string;
  description: string;
  navItems: { name: string; href: string }[];
}

export const HomePage = (props: HomePageProps) => {
  const { title, description, navItems } = props;

  console.log(navItems);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <nav className="my-16 animate-fade-in">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <ul className="flex items-center justify-center gap-4 text-sm text-zinc-200 ">
              {item.name}
            </ul>
          </Link>
        ))}
      </nav>
      <FadeRightLine />
      <GradientTitleText text={title} />
      <FadeLeftLine />
      <div className="my-16 text-center animate-fade-in text-zinc-50">
        {description}
        {/* <h2 className="text-sm text-zinc-500 ">{description}</h2> */}
      </div>
    </div>
  );
};
