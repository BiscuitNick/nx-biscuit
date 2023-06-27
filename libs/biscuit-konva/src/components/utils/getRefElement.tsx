// import { RefObject } from "react";

export const getRefElement = (element: any) => {
  if (element && 'current' in element) {
    return element.current;
  }

  return element;
};
