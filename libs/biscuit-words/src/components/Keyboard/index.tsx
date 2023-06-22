import React, { useEffect, useState } from "react";
import { QwertyNoSpacebar, QwertyWithSpacebar } from "./constants";
import KeyboardKey from "./KeyboardKey";

interface KeyboardProps {
  handleKeyPress: any; //(char:string) => void;
  mode?: "QwertyNoSpacebar" | "QwertyWithSpacebar";
  usedChars?: string[];
  inWordChars?: string[];
  correctChars?: string[];
  downChar?: string;
}

const Keyboard = (props: KeyboardProps) => {
  const {
    handleKeyPress,
    usedChars = [],
    inWordChars = [],
    correctChars = [],
    mode = "QwertyWithSpacebar",
    downChar = "",
  } = props;
  const KeyboardTemplate =
    mode === "QwertyNoSpacebar" ? QwertyNoSpacebar : QwertyWithSpacebar;

  const [maxMinWidth, setMaxMinWidth] = useState(48);

  useEffect(() => {
    const width = window.innerWidth;
    const maxKeyWidth = Math.floor((width - 55) / 10);
    setMaxMinWidth(maxKeyWidth);
  }, []);

  return (
    <div className="keyboard-grid">
      {KeyboardTemplate.map((row, i) => {
        return (
          <div key={i} className="keyboard-row">
            {row.map((char) => {
              if (char.length === 1) {
                const className = correctChars.includes(char)
                  ? "correct"
                  : inWordChars.includes(char)
                  ? "in-word"
                  : usedChars.includes(char)
                  ? "wrong"
                  : "unused";
                return (
                  <KeyboardKey
                    id={char}
                    key={char}
                    handleKeyPress={handleKeyPress}
                    isDown={char === downChar}
                    char={char}
                    className={className}
                    style={maxMinWidth < 48 ? { minWidth: maxMinWidth } : {}}
                  />
                );
              }
              const keyText =
                char === "Backspace"
                  ? "⌫"
                  : char === "Spacebar"
                  ? ""
                  : char === "Enter"
                  ? "↵"
                  : char;

              // TODO make this a multiple of maxMinWidth
              const width = char === "Spacebar" ? 200 : "auto";

              return (
                <KeyboardKey
                  id={char}
                  key={char}
                  handleKeyPress={handleKeyPress}
                  isDown={
                    char === downChar ||
                    (char === "Spacebar" && downChar === " ")
                  }
                  char={keyText}
                  className="unused"
                  style={{
                    fontSize: "1.5rem",
                    width,
                    minWidth: maxMinWidth < 48 ? maxMinWidth * 1.5 : 72,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
