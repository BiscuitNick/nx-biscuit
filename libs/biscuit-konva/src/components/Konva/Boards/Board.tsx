import React from 'react';
import { useEffect } from 'react';

// const Konva = require("react-konva");
// const { Stage, Layer } = Konva;
import { Stage, Layer, Rect } from 'react-konva';

export interface BoardProps {
  width: number;
  height: number;

  canvasRef?: any;
  children?: any;
  style?: any;
}

export const Board = (props: BoardProps) => {
  return (
    <Stage width={props.width} height={props.height} style={props.style}>
      <Layer ref={props.canvasRef}>{props.children}</Layer>
    </Stage>
  );
};

// listening={false}
