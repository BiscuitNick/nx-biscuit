interface PokerButtonProps {
  handleClick: () => void;
  texts: string[];
}

export const PokerButton = ({ handleClick, texts }: PokerButtonProps) => {
  return (
    <button className="draw-poker-button" onClick={handleClick}>
      <div className="button-grid">
        {texts.map((text, i) =>
          text.length ? (
            <div key={i}>{text}</div>
          ) : (
            <hr key={i} style={{ borderTop: '1px solid black' }} />
          )
        )}
      </div>
    </button>
  );
};
