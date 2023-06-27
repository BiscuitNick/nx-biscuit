import React from "react";

interface KeyboardKeyProps {
  char: string;
  isDown?: boolean;
  className?: string;
  style?: any;
  handleKeyPress: any;

  downChar?: string;
  id?: string;
  // Styling props
  // width: number;
  // height: number;
  // fontSize: number;
  // borderRadius: number;
}

const KeyboardKey = (props: KeyboardKeyProps) => {
  const { handleKeyPress, char, isDown = false, className, style, id } = props;
  return (
    <button
      onClick={() => handleKeyPress(id)}
      className={`keyboard-key ${className} ${isDown ? "pressed" : ""}`}
      style={style}
    >
      <span>{char.toUpperCase()}</span>
    </button>
  );
};

export default KeyboardKey;
