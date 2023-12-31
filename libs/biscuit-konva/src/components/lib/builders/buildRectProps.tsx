export interface rectBuild {
  rotation?: number;
  fill?: string;
  stroke?: string;
  draggable?: boolean;
  cornerRadius?: number;
  strokeEnabled?: boolean;
  fillEnabled?: boolean;
  r_width: number;
  r_height: number;
  r_x: number;
  r_y: number;
  r_strokeWidth: number;
  absolutes: {
    x?: number;
    y?: number;
    width: number;
    height: number;
  };
  active?: boolean;
}

const buildRectProps = (params: rectBuild) => {
  const { r_x, r_y, r_width, r_height, r_strokeWidth, absolutes } = params;
  const { width, height } = absolutes;

  const x = r_x * width;
  const y = r_y * height;
  const w = r_width * width;
  const h = r_height * height;

  const strokeWidth = (r_strokeWidth * Math.min(w, h)) / 2;
  const adjustedWidth = w - strokeWidth;
  const adjustedHeight = h - strokeWidth;

  const box = {
    x,
    y,
    width: adjustedWidth,
    height: adjustedHeight,
    offsetX: adjustedWidth / 2,
    offsetY: adjustedHeight / 2,
    strokeWidth,
    box: absolutes,
  };

  return { ...params, ...box };
};

export default buildRectProps;
