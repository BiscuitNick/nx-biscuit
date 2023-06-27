import { Stage, Layer, Circle } from 'react-konva';

function BiscuitCanvas() {
  return (
    // <div>foo</div>
    <Stage width={500} height={500}>
      <Layer>
        <Circle x={200} y={100} radius={50} fill="purple" />
      </Layer>
    </Stage>
  );
}

export { BiscuitCanvas };
