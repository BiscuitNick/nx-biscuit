import '../styles/global.css';

interface HomePageProps {
  title: string;
  description: string;
}

export const HomePage = (props: HomePageProps) => {
  const { title, description } = props;
  return (
    // <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden ">
    <div className="flex flex-col items-center justify-center w-scree h-screen">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4"></ul>
      </nav>

      <div></div>

      <h1 className="title-text animate-title text-6xl sm:text-8xl md:text-10xl">
        {title}
      </h1>

      <div className="w-screen h-px animate-glow md:block animate-fade-right " />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">{description}</h2>
      </div>
    </div>
  );
};
