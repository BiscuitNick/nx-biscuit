import { useState, useRef } from 'react';
import { getStageData } from '../utils/getStageData';
import { useInterval } from './useInterval';

export interface StagePositions {
  canvasRef: any;
  delay?: number;
}

export const useEyeMovement = ({ canvasRef, delay }: StagePositions) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const inactivityCount = useRef(0);
  const pointerY = useRef(0);
  const pointerX = useRef(0);

  useInterval(() => {
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
