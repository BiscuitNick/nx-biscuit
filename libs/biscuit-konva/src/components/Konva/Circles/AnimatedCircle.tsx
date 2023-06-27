import React from 'react';
// const SpringKonva = require('@react-spring/konva');
// const { animated, useSpring } = SpringKonva;
// const Konva = require("react-konva");
// const { Circle } = Konva;
// import { Circle } from 'react-konva';
import { animated, useSpring } from '@react-spring/konva';

export interface CircleProps {
  //Position
  x: number;
  y: number;

  //Size
  radius: number;

  //StyleF
  fill?: string;
  stroke?: string;
  fillEnabled?: boolean;
  strokeEnabled?: boolean;
  strokeWidth?: number;

  //Interactions
  canvasRef?: object;
  draggable?: boolean;
  handleClick?: any;
  handleDrag?: any;
  immediateXY?: boolean;

  listening?: boolean;

  contentID: string;

  box?: { width: number; height: number };
}

const AnimatedCircle = (props: CircleProps) => {
  const {
    x,
    y,
    radius,
    fill,
    stroke,
    fillEnabled,
    strokeEnabled,
    strokeWidth,
  } = props;
  const circleSpring = useSpring({ radius, fill, stroke, strokeWidth });
  const xySpring = useSpring({
    x,
    y,
    immediate: props.immediateXY || false,
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <animated.Circle
      {...circleSpring}
      {...xySpring}
      contentID={props.contentID}
      id={props.contentID}
      box={props.box}
      draggable={props.draggable}
      fillEnabled={fillEnabled}
      strokeEnabled={strokeEnabled}
      onClick={props.handleClick}
      onDragStart={props.handleDrag}
      onDragEnd={props.handleDrag}
      listening={props.listening}
    />
  );
};

export default AnimatedCircle;
