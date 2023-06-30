interface PokerButtonProps {
  handleClick: () => void;
  text: string;
  background?: string;
  color?: string;
  disabled?: boolean;
}

export const PokerButton = ({
  handleClick,
  text,
  background,
  color,
  disabled,
}: PokerButtonProps) => {
  return (
    <button
      className="draw-poker-button"
      style={{ background, color }}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
