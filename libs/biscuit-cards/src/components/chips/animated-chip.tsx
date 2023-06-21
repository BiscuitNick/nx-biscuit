import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";
// import { useState } from "react";

// Bug --> First chip does not display when this component if imported into Nextjs app
// So we are doing away with the animation effect for now.

interface AnimatedChipProps {
  value: number | "50cent";
  handleClick?: () => void;
  bottom: number;
  left: number;
  y?: number;
}

export const AnimatedChip = (props: AnimatedChipProps) => {
  const { value, handleClick, bottom, left, y = 1000 } = props;
  //   const [remove, setRemove] = useState(false);

  console.log(17, "wtf??");

  // const [spring, api] = useSpring(
  //   () => ({
  //     from: { y },
  //     to: { y: bottom, x: left },
  //   }),
  //   [left]
  // );

  return (
    // <animated.img
    //   style={spring}
    //   className="bet-chip"
    //   src={`/chips/${value}.png`}
    //   onClick={handleClick}
    // />

    <img
      style={{ bottom: -bottom - 50, left }}
      className="bet-chip"
      src={`/chips/${value}.png`}
      onClick={handleClick}
    />
  );
};

// position: "absolute",
