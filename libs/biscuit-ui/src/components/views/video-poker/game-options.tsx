import { ToggleSwitch } from '../../inputs';

export const GameOptions = (props: any) => {
  const {
    showOptions,
    width,
    height,
    toggleOptions,
    toggleBuddy,
    showBuddy,
    toggleAutoPlay,
    autoPlay,
  } = props;
  return (
    <div
      className="game-options"
      style={{
        bottom: showOptions ? 0 : '-100%',
      }}
    >
      <div
        style={{
          width,
          height,
          background: '#000000cc',
          margin: 'auto',
          display: 'grid',
          gridAutoRows: '50px',

          position: 'relative',
          padding: 10,
        }}
      >
        <button
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            width: 30,
            background: 'red',
            color: 'white',
          }}
          onClick={toggleOptions}
        >
          X
        </button>

        <div className="text-white">OPTIONS</div>
        <ToggleSwitch
          label={'Show Buddy'}
          checked={showBuddy}
          onChange={toggleBuddy}
        />
        <ToggleSwitch
          label={'Auto Play'}
          checked={autoPlay}
          onChange={toggleAutoPlay}
        />
      </div>
    </div>
  );
};
