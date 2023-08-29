import React from 'react';
// import "./ColorPickers.css";

export interface ColorPickerProps {
  id: string;
  label?: string;
  value: string;
  onChange: (e: any) => void;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { id, label, value, onChange } = props;

  return (
    <div className={'inputContainer2Wide'}>
      <label className={'attributeLabel'}>
        <span style={{ margin: 'auto' }}>{label || id}</span>
      </label>
      <input
        id={id}
        type="color"
        value={value}
        onChange={onChange}
        className={'attributeInput'}
      />
    </div>
  );
};
