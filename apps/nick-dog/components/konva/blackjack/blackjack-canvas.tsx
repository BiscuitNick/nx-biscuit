import { Background } from '../background-rect';

export const BlackjackCanvas = (props: any) => {
  const { width, height } = props;

  return (
    <>
      <Background width={width} height={height} color={'blue'} />
    </>
  );
};
