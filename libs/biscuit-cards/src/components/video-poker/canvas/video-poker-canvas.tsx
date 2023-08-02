// import { Stage, Layer, Rect } from 'react-konva';
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

  return ready ? <div>Ready...</div> : <div>Loading...</div>;
};
