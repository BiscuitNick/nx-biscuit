import '../../styles/global.css';
import Link from 'next/link';
import { FadeRightLine, FadeLeftLine } from '../lines';
import { GradientTitleText } from '../texts';
import { GitHubLink } from '../icons';

interface HomePageProps {
  title: string;
  description: string[];
  navItems: { name: string; href: string }[];
  gitHubUrl?: string;
}

export const HomePage = (props: HomePageProps) => {
  const { title, description, navItems, gitHubUrl } = props;

  console.log(navItems);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <nav className="my-16 animate-fade-in flex flex-row space-x-2">
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
      <p className="my-8 text-sm text-center animate-fade-in text-zinc-200">
        {description.map((text) => (
          <>
            {text}
            <br />
          </>
        ))}
        {gitHubUrl && (
          <GitHubLink
            href={gitHubUrl}
            style={{
              margin: 10,
              color: 'white',
              fontSize: 'xx-large',
            }}
          />
        )}
      </p>
    </div>
  );
};
