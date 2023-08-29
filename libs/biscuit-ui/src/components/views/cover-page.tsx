import React from 'react';
import { FadeRightLine, FadeLeftLine } from '../lines';
import { GradientTitleText, ImageTitleText } from '../texts';
interface CoverPageProps {
  title: string;
  image?: string;
}

export const CoverPage = ({ title, image }: CoverPageProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center absolute top-0 w-full h-full ${
        show ? 'animate-exit-top' : ''
      }`}
      onClick={() => {
        setShow(true);
      }}
    >
      <FadeRightLine />
      {image ? (
        <ImageTitleText text={title} image={image} />
      ) : (
        <GradientTitleText text={title} />
      )}
      <FadeLeftLine />
    </div>
  );
};
