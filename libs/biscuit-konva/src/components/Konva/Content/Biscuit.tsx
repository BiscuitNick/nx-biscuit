import React from 'react';
import { Group } from 'react-konva';
import { Eye, AnimatedRectangle, AnimatedImage, AnimatedText } from '../';
import { useStagePositions } from '../../hooks';
import { getInnerPosition } from '../../utils/getInnerPosition';

import {
  buildEyeProps,
  buildRectProps,
  buildImageProps,
  buildTextProps,
} from '../../lib/builders';

export interface BiscuitObject {
  contentObject: any; //{ [key: string]: any };
  contentIDs: string[];

  box: { width: number; height: number; x?: number; y?: number };

  canvasRef: any;

  handleClick: any;
  handleDrag: any;
  id: string;
}

export const Biscuit = (props: BiscuitObject) => {
  const {
    contentObject,
    contentIDs,
    box,
    canvasRef,
    handleClick,
    handleDrag,
    // id,
  } = props;

  const focalPoint = useStagePositions({ canvasRef });

  const { width, height } = box;
  const squareWH = Math.min(width, height);
  const x = box.x || 0;
  const y = box.y || 0;
  const squareBox = { width: squareWH, height: squareWH };
  const centerBox = {
    x: (width - squareWH) / 2 + x,
    y: (height - squareWH) / 2 + y,
  };
  const BiscuitContent = contentIDs.map((contentID: string) => {
    const contentType = contentID?.split('_')[0];
    const data = contentObject[contentID];

    if (!data) return null;

    const { active } = data;

    if (!active) return null;

    switch (contentType) {
      case 'eye': {
        const eyeprops = buildEyeProps({
          ...data,
          absolutes: squareBox,
        });

        const innerXY = getInnerPosition({
          ...eyeprops,
          focalPoint: {
            x: focalPoint.x - centerBox.x,
            y: focalPoint.y - centerBox.y,
          },
        });

        return (
          <Eye
            key={contentID}
            contentID={contentID}
            {...eyeprops}
            innerXY={innerXY}
            handleDrag={handleDrag}
            handleClick={handleClick}
          />
        );
      }
      case 'rect': {
        const rectProps = buildRectProps({
          ...data,
          absolutes: squareBox, //{ width: squareWH, height: squareWH },
        });

        return (
          <AnimatedRectangle
            key={contentID}
            contentID={contentID}
            {...rectProps}
            handleDrag={handleDrag}
            handleClick={handleClick}
          />
        );
      }
      case 'image': {
        const imageProps = buildImageProps({
          ...data,
          absolutes: squareBox, //{ width: squareWH, height: squareWH },
        });

        return (
          <AnimatedImage
            key={contentID}
            contentID={contentID}
            {...imageProps}
            handleDrag={handleDrag}
            handleClick={handleClick}
          />
        );
      }
      case 'text': {
        const textProps = buildTextProps({
          ...data,
          absolutes: squareBox,
        });

        return (
          <AnimatedText
            key={contentID}
            contentID={contentID}
            {...textProps}
            handleDrag={handleDrag}
            handleClick={handleClick}
            canvasRef={canvasRef}
          />
        );
      }
      default:
        return null;
    }
  });

  return <Group {...centerBox}>{BiscuitContent}</Group>;
};

// export default Biscuit;
