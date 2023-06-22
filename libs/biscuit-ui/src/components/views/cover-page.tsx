import React from 'react';

interface CoverPageProps {
  title: string;
}

export const CoverPage = ({ title }: CoverPageProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center bg-black absolute top-0 w-full h-full ${
        show ? 'animate-exit-top' : ''
      }`}
      onClick={() => {
        setShow(true);
      }}
    >
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"></div>
      <h1 className="image-text animate-title text-6xl sm:text-8xl md:text-10xl">
        {title}
      </h1>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"></div>
    </div>
  );
};
