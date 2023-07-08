interface GradientTextProps {
  text: string;
  handleClick?: () => void;
}

export const AnimatedGradientTitleText = ({
  text,
  handleClick,
}: GradientTextProps) => (
  <h1
    className="gradient-text animate-title text-6xl sm:text-8xl md:text-10xl"
    onClick={handleClick}
  >
    {text}
  </h1>
);

export const GradientTitleText = ({ text, handleClick }: GradientTextProps) => (
  <h1
    className="gradient-text text-6xl sm:text-8xl md:text-10xl"
    onClick={handleClick}
  >
    {text}
  </h1>
);
