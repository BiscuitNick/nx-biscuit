import { useSpring, animated } from "@react-spring/web";
import { Card } from "./card";

interface FlipCardProps {
  faceUp?: boolean;
  raw?: number;
  handleClick?: () => void;
  width?: number;
  height?: number;
  index?: number;
  exit?: boolean;

  yOffSet?: number;
  xOffSet?: number;
  isSplit?: boolean;
}

export const FlipCard = (props: FlipCardProps) => {
  const {
    raw = 0,
    handleClick,
    // height = 252,
    // width = 180,
    height = 147,
    width = 105,
    faceUp,
    index = 0,
    exit = false,
    yOffSet = 0,

    xOffSet = 0,

    isSplit = false,
    // xOffSet = 310 - 105,
  } = props;

  // const xOffSet = (310 - 105) / 2 - 15;

  const { x, y, rotate } = useSpring({
    from: { x: -1000, y: isSplit ? 1000 : -1000, rotate: -45 },
    to: {
      x: exit ? 1000 : xOffSet + 30 * index,
      y: exit ? -1000 : yOffSet,
      rotate: exit ? 45 : 0,
    },
    // delay: exit ? 0 : index * 500,
  });

  return (
    <animated.div
      className="flip-card-wrapper"
      style={{
        height,
        width,
        x,
        y,
        rotate,
      }}
      onClick={handleClick}
    >
      <div
        className="flip-card-inner"
        style={{
          transform: faceUp ? "rotateY(0deg)" : "rotateY(180deg)",
        }}
      >
        <div className="flip-card-front">
          <Card raw={raw} />
        </div>
        <div className="flip-card-back"></div>
      </div>
    </animated.div>
  );
};
