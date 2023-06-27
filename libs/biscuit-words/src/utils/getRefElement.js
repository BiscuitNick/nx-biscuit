// import { RefObject } from "react";

const getRefElement = (element) => {
  if (element && "current" in element) {
    return element.current;
  }

  return element;
};

export default getRefElement;
