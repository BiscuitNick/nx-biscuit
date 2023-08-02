import { Stage, Layer, Rect } from 'react-konva';
import { useState, useEffect } from 'react';
interface VideoPokerCanvasProps {
  width: number;
  height: number;
  style: any;
  bgColor: string;
}

export const VideoPokerCanvas = (props: VideoPokerCanvasProps) => {
  const { width, height, style, bgColor } = props;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? (
    <Stage width={width} height={height} style={style}>
      <Layer>
        <Rect width={width} height={height} fill={bgColor} />
      </Layer>
    </Stage>
  ) : (
    <div>Loading...</div>
  );
};
