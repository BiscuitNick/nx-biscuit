import { useState, useRef } from 'react';
import { getStageData } from '../utils/getStageData';
import { useInterval } from './useInterval';

export interface StagePositions {
  canvasRef: any;
  delay?: number;
  focalPoint?: { x: number; y: number };
}

export const useEyeMovement = ({
  canvasRef,
  delay,
  focalPoint,
}: StagePositions) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [focalPointX, setFocalPointX] = useState(0);
  const [focalPointY, setFocalPointY] = useState(0);

  const inactivityCount = useRef(0);
  const pointerY = useRef(0);
  const pointerX = useRef(0);

  useInterval(() => {
    if (
      focalPointX === focalPoint?.x &&
      focalPointY === focalPoint?.y &&
      focalPoint?.x !== x &&
      focalPoint?.y !== y
    ) {
      setX(x);
      setY(y);
      setFocalPointX(focalPoint?.x || 0);
      setFocalPointY(focalPoint?.y || 0);

      inactivityCount.current = 0;
    }
    const stageData = getStageData(canvasRef);
    if (!stageData) return null;
    const pointer = stageData.getPointerPosition();
    if (!pointer) {
      // pointerX.current = pointer.x;
      // pointerY.current = pointer.y;
      inactivityCount.current++;
      if (inactivityCount.current > 20) {
        const { width, height } = stageData.attrs;
        inactivityCount.current = 0;
        setX(Math.floor(Math.random() * width));
        setY(Math.floor(Math.random() * height));
      }
    } else if (
      pointer.x === pointerX.current &&
      pointer.y === pointerY.current
    ) {
      pointerX.current = pointer.x;
      pointerY.current = pointer.y;
      inactivityCount.current++;
      if (inactivityCount.current > 20) {
        const { width, height } = stageData.attrs;
        inactivityCount.current = 0;
        setX(Math.floor(Math.random() * width));
        setY(Math.floor(Math.random() * height));
      }
    } else {
      pointerX.current = pointer.x;
      pointerY.current = pointer.y;
      inactivityCount.current = 0;
      setX(pointer.x);
      setY(pointer.y);
    }
  }, delay || 200);

  return { x, y };
};
