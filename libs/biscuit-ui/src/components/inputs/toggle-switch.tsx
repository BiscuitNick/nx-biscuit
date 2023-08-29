// interface ToggleProps {
//   label: string;
//   checked: boolean;
//   onChange: () => void;
// }

// export const ToggleSwitch = (props: ToggleProps) => {
//   const { label, checked, onChange } = props;
//   return (
//     <div style={{ display: 'grid', gridTemplateColumns: '100px 100px' }}>
//       <label style={{ margin: 'auto', color: 'white', width: '100%' }}>
//         {label}
//       </label>
//       <label className="switch" style={{ margin: 'auto' }}>
//         <input type="checkbox" checked={checked} onChange={onChange} />
//         <span className="slider round"></span>
//       </label>
//     </div>
//   );
// };

export interface ToggleSwitchProps {
  id: string;
  label?: string;

  value: boolean;
  onChange: any;

  round?: boolean;
  color?: string;
}

export const ToggleSwitch = (props: ToggleSwitchProps) => {
  const { id, label, value, onChange } = props;

  return (
    <div className="inputContainer2Wide">
      {label ? (
        <label className={'attributeLabel'}>
          <span style={{ margin: 'auto' }}>{label || id}</span>
        </label>
      ) : null}
      <label className="switch">
        <input type="checkbox" checked={value} onChange={onChange} id={id} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
