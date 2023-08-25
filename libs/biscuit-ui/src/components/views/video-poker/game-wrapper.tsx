interface GameWrapperProps {
  width: number;
  height: number;
  children?: any;
}

export const GameWrapper = (props: GameWrapperProps) => {
  const { width, height, children } = props;
  return (
    <div
      className="game-wrapper"
      style={{
        width,
        height,
      }}
    >
      {children}
    </div>
  );
};
