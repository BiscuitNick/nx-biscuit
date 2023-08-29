interface ButtonProps {
  label: string;
  onClick: () => void;
  background?: string;
  color?: string;
}

export const SimpleButton = ({
  label,
  onClick,
  background,
  color,
}: ButtonProps) => (
  <button style={{ background, color }} onClick={onClick}>
    {label}
  </button>
);
