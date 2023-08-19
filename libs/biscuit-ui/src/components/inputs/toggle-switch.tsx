interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const ToggleSwitch = (props: ToggleProps) => {
  const { label, checked, onChange } = props;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '100px 100px' }}>
      <label style={{ margin: 'auto', color: 'white', width: '100%' }}>
        {label}
      </label>
      <label className="switch" style={{ margin: 'auto' }}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
