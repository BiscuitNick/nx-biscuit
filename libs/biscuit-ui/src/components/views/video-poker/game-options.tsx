'use client';

import { useState } from 'react';
import { ToggleSwitch } from '../../inputs';
import { SimpleButton } from '../../buttons';

import { ColorPicker } from '../../inputs';

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

    colors,
    setColors,
  } = props;

  const [selectedTab, setSelectedTab] = useState<'Game' | 'Buddy' | 'View'>(
    'Game'
  );

  const [gameMode, setGameMode] = useState<string>('Play');

  const optionsArray = [
    {
      label: 'Show Buddy',
      type: 'toggle',
      value: showBuddy,
      onChange: toggleBuddy,
      tab: 'Buddy',
    },
    {
      label: 'Mode',
      type: 'select',
      options: ['Play', 'Watch', 'Explore'],
      value: autoPlay,
      onChange: toggleAutoPlay,
      tab: 'Game',
    },
    {
      label: 'Auto Play',
      type: 'toggle',
      value: autoPlay,
      onChange: toggleAutoPlay,
      tab: 'Game',
    },
    {
      label: 'Table',
      type: 'select',
      options: ['odds', 'payouts'],
      value: autoPlay,
      onChange: toggleAutoPlay,
      tab: 'View',
    },
  ].filter(({ tab }) => tab === selectedTab);

  return (
    <div
      className="game-options"
      style={{
        bottom: showOptions ? 0 : '-100%',
        height,
        width,
      }}
    >
      <div className="options-header-bar">
        <SimpleButton
          color={selectedTab === 'Game' ? 'limegreen' : 'white'}
          label={'Game'}
          onClick={() => setSelectedTab('Game')}
        />
        <SimpleButton
          color={selectedTab === 'Buddy' ? 'limegreen' : 'white'}
          label={'Buddy'}
          onClick={() => setSelectedTab('Buddy')}
        />
        <SimpleButton
          color={selectedTab === 'View' ? 'limegreen' : 'white'}
          label={'View'}
          onClick={() => setSelectedTab('View')}
        />
      </div>

      <div className="options-content">
        {optionsArray.map(({ label, type, value, onChange, options = [] }, i) =>
          type === 'toggle' ? (
            <ToggleSwitch
              key={i}
              id={label}
              label={label}
              value={value}
              onChange={onChange}
            />
          ) : type === 'select' ? (
            <div key={i} />
          ) : // <div style={{ display: 'grid', gridAutoFlow: 'column' }}>
          //   <label style={{ margin: 'auto', color: 'white' }}>{label}</label>
          //   {options.map((option) => (
          //     <SimpleButton
          //       color={gameMode === option ? 'limegreen' : 'white'}
          //       label={option}
          //       onClick={() => setGameMode(option)}
          //     />
          //   ))}
          // </div>
          null
        )}

        {Object.keys(colors).map((key, i) => (
          <ColorPicker
            key={i}
            id={key}
            label={key}
            value={colors[key]}
            onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
          />
          //   <div
          //     style={{
          //       display: 'grid',
          //       gridTemplateColumns: '1fr 1fr',
          //       width: '100%',
          //       padding: 10,
          //     }}
          //   >
          //     <label
          //       style={{
          //         margin: 'auto',
          //         width: '100%',
          //         color: 'white',
          //         background: 'black',
          //       }}
          //     >
          //       {key}
          //     </label>
          //     <input
          //       style={{ margin: 'auto', width: '100%' }}
          //       type="color"
          //       value={colors[key]}
          //       onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
          //     />
          //   </div>
        ))}
      </div>

      <div className="options-bottom-bar">
        <SimpleButton
          background={'limegreen'}
          label={'OK'}
          onClick={toggleOptions}
        />
      </div>
    </div>
  );
};
