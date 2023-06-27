'use client';

import React, { useRef, useState } from 'react';
import { useWindowSize } from '../../hooks';
import { Board } from './Board';
import { Biscuit } from '../Content/Biscuit';
import Konva from 'konva';

export interface BiscuitBoardProps {
  width?: number;
  height?: number;
  contentIDs: string[];
  contentObject?: {
    [key: string]: any;
  };
}

Konva.showWarnings = false;

export const BiscuitBoard: any = (props: BiscuitBoardProps) => {
  // const [show, toggle] = useState(false);
  const { contentIDs, contentObject } = props;

  const { width, height } = useWindowSize();
  const canvasRef = useRef<any>(null);
  const dragItem = useRef<any>(null);

  const [, setSelectedID] = useState('');
  // const [contentIDs] = useState(initIDs); //setContentIDs
  // const [contentOrder] = useState(contentIDs.map((id, i) => i));
  // const [contentObject, setContentObject] = useState(initContentObject);
  // const [changeLog, setChangeLog] = useState<any>([]);

  const handleClick = (e: { target: { attrs: any } }) => {
    const attrs = e.target.attrs;
    const { contentID } = attrs;

    // console.log(contentID);

    setSelectedID(contentID || '');
  };

  const handleDrag = (e: { target: { attrs: any } }) => {
    // const attrs = e.target.attrs;
    // const { contentID, x, y, box } = attrs;
    // setSelectedID(contentID);
    // if (dragItem.current != contentID) {
    //   dragItem.current = contentID;
    // } else {
    //   dragItem.current = '';
    //   const contentItem = contentObject[contentID];
    //   const newR_X = x / box.width; //squareWH;
    //   const newR_Y = y / box.height; //squareWH;
    //   const timeStamp = new Date().getTime();
    //   const lastTime = changeLog[changeLog.length - 1]?.timeStamp || 0;
    //   const diff = timeStamp - lastTime;
    //   if (diff > 1000) {
    //     setChangeLog([
    //       ...changeLog,
    //       {
    //         contentID,
    //         attr: 'r_x',
    //         r_x: newR_X,
    //         r_y: newR_Y,
    //         method: 'drag',
    //         timeStamp,
    //       },
    //     ]);
    //   } else {
    //     const copyLog = [...changeLog];
    //     copyLog[copyLog.length - 1] = {
    //       contentID,
    //       attr: 'r_x',
    //       r_x: newR_X,
    //       r_y: newR_Y,
    //       method: 'drag',
    //       timeStamp,
    //     };
    //     setChangeLog(copyLog);
    //   }
    //   setContentObject({
    //     ...contentObject,
    //     [contentID]: {
    //       ...contentItem,
    //       r_x: newR_X,
    //       r_y: newR_Y,
    //     },
    //   });
    // }
  };

  return (
    <Board width={width} height={height} canvasRef={canvasRef}>
      <Biscuit
        box={{ width, height }}
        contentObject={contentObject}
        contentIDs={contentIDs}
        canvasRef={canvasRef}
        handleClick={handleClick}
        handleDrag={handleDrag}
        key={'b1'}
        id={'b1'}
      />
    </Board>
  );
};
