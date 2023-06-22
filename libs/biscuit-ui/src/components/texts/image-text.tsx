interface GradientTextProps {
  text: string;
  image: string;
}

export const ImageTitleText = ({ text, image }: GradientTextProps) => (
  <h1
    className="image-text animate-title text-6xl sm:text-8xl md:text-10xl"
    style={{ backgroundImage: `url(${image}` }}
  >
    {text}
  </h1>
);
