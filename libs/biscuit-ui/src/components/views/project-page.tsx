import '../../styles/global.css';
import Link from 'next/link';

interface HomePageProps {
  title: string;
  description: string;
  navItems: { name: string; href: string }[];
}

export const ProjectPage = (props: HomePageProps) => {
  const { title, description, navItems } = props;

  console.log(navItems);

  return (
    <div className="flex flex-col items-center justify-center w-scree h-screen">
      <nav className="my-16 animate-fade-in">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <ul className="flex items-center justify-center gap-4 text-sm text-zinc-500 ">
              {item.name}
            </ul>
          </Link>
        ))}
      </nav>
      <div className="hidden w-screen h-px md:block animate-fade-left bg-white"></div>
      <h1 className="image-text animate-title text-6xl sm:text-8xl md:text-10xl">
        {title}
      </h1>
      <div className="hidden w-screen h-px md:block animate-fade-right bg-white"></div>
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">{description}</h2>
      </div>
    </div>
  );
};
