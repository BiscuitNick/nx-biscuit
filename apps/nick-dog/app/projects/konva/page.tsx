'use client';
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';

// const Canvas = dynamic(() => import('../../../components/canvas'), {
//   ssr: false,
// });

import { Rect } from 'react-konva';

const BiscuitBoard: any = dynamic(() =>
  import('@biscuitnick/biscuit-konva').then((mod: any) => mod.BiscuitBoard)
);

// import { BiscuitCanvas } from '@biscuitnick/biscuit-konva';

export default function Page() {
  // const canvasRef = useRef<any>(null);

  return (
    <BiscuitBoard
      // width={200} // - 50}
      // height={200} // - 50}
      // canvasRef={canvasRef}
      // style={{ margin: 'auto' }}
      contentObject={{
        eye_0: {
          innerXY: {
            x: 0,
            y: 0,
          },
          innerRotation: 0,
          outerRotation: 0,
          w2h: 1.2,
          sensitivity: 0.5,
          movementFactor: 0.5,
          innerShape: 'Circle',
          outerShape: 'Circle',
          innerFill: '#000000',
          outerFill: '#ffffff',
          innerStroke: '#357388',
          outerStroke: '#ffffff',
          disableClip: false,
          innerStrokeEnabled: true,
          innerFillEnabled: true,
          outerStrokeEnabled: false,
          outerFillEnabled: false,
          r_outerSize: 0.04,
          r_outer2inner: 0.5,
          r_x: 0.39,
          r_y: 0.33,
          r_innerStrokeWidth: 0.0,
          r_outerStrokeWidth: 0.1,
          active: true,
          contentID: 'eye_0',
          // r_width: 0.05,
          // r_height: 0.08,
          draggable: false,
        },
        eye_1: {
          innerXY: {
            x: 0,
            y: 0,
          },
          innerRotation: 0,
          outerRotation: 0,
          w2h: 1.2,
          sensitivity: 0.5,
          movementFactor: 0.5,
          innerShape: 'Circle',
          outerShape: 'Circle',
          innerFill: '#000000',
          outerFill: '#ffffff',
          innerStroke: '#357388',
          outerStroke: '#ffffff',
          disableClip: false,
          innerStrokeEnabled: true,
          innerFillEnabled: true,
          outerStrokeEnabled: false,
          outerFillEnabled: false,
          r_outerSize: 0.04,
          r_outer2inner: 0.5,
          r_x: 0.61,
          r_y: 0.33,
          r_innerStrokeWidth: 0.0,
          r_outerStrokeWidth: 0.1,
          active: true,
          contentID: 'eye_0',
          // r_width: 0.05,
          // r_height: 0.08,
          draggable: false,
        },
        image_1: {
          name: 'Biscuit Image',
          rotation: 0,
          draggable: false,
          cornerRadius: 0,
          keepAspectRatio: false,
          verticalAlign: 'middle',
          horizontalAlign: 'center',
          fillEnabled: false,
          strokeEnabled: false,
          fill: '#ffffff',
          stroke: '#000000',
          src: '/assets/biscuitland/executive-cat-no-eyes.png',
          r_x: 0.5,
          r_y: 0.5,
          r_width: 1,
          r_height: 1,
          r_strokeWidth: 0.0,
          active: true,
          contentID: 'image_1',
        },
        image_2: {
          name: 'Biscuit Image',
          rotation: 0,
          draggable: false,
          cornerRadius: 0,
          keepAspectRatio: true,
          verticalAlign: 'middle',
          horizontalAlign: 'center',
          fillEnabled: false,
          strokeEnabled: false,
          fill: '#ffffff',
          stroke: '#000000',
          src: '/assets/biscuitland/executive-cat-no-pupils.png',
          r_x: 0.5,
          r_y: 0.5,
          r_width: 1,
          r_height: 1,
          r_strokeWidth: 0.02,
          active: true,
          contentID: 'image_2',
        },
      }}
      contentIDs={['image_2', 'eye_0', 'eye_1', 'image_1']}
    />
  );
}
