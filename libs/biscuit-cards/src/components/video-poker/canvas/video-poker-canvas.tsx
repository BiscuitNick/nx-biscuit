// import { Stage, Layer, Rect } from 'react-konva';

// interface VideoPokerCanvasProps {
//   width: number;
//   height: number;
//   style: any;
//   bgColor: string;
// }

export const VideoPokerCanvas = (props: VideoPokerCanvasProps) => {
  const { width, height, style, bgColor } = props;

  return (
    <div>Canvas Place Holder -- react-konva import is breaking deployments</div>
    // <Stage width={width} height={height} style={style}>
    //   <Layer>
    //     <Rect width={width} height={height} fill={bgColor} />
    //   </Layer>
    // </Stage>
  );
};
