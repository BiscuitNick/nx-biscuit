import { PokerButton } from './poker-button';

interface BottomButtonsProps {
  status: string;
  minusBet: () => void;
  betOne: () => void;
  betMax: () => void;
  dealOrDraw: () => void;
  toggleOdds: () => void;
}

export const BottomButtons = ({
  status,
  minusBet,
  betOne,
  betMax,
  dealOrDraw,
  toggleOdds,
}: BottomButtonsProps) => {
  return (
    <div className="button-grid">
      {/* <PokerButton
        handleClick={toggleOdds}
        text={'LOBBY'}
        background={'black'}
        color={'white'}
        // disabled={status !== 'pendingNewGame'}
      /> */}
      <PokerButton
        handleClick={toggleOdds}
        text={'Show Odds'}
        background={'black'}
        color={'white'}
        // disabled={status !== 'pendingNewGame'}
      />
      <PokerButton
        handleClick={minusBet}
        text={'BET -'}
        disabled={status !== 'pendingNewGame'}
      />
      <PokerButton
        handleClick={betOne}
        text={'BET +'}
        disabled={status !== 'pendingNewGame'}
      />
      <PokerButton
        handleClick={betMax}
        text={'MAX BET'}
        disabled={status !== 'pendingNewGame'}
      />
      <PokerButton
        handleClick={dealOrDraw}
        text={status === 'pendingNewGame' ? 'DEAL' : 'DRAW'}
        background={'green'}
        color={'white'}
        disabled={status === 'dealingCards' || status === 'dealingDraw'}
      />
    </div>
  );
};
