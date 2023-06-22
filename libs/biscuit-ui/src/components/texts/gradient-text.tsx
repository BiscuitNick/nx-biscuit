interface GradientTextProps {
  text: string;
}

export const GradientTitleText = ({ text }: GradientTextProps) => (
  <h1 className="gradient-text animate-title text-6xl sm:text-8xl md:text-10xl">
    {text}
  </h1>
);
