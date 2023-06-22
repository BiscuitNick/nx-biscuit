import { letters1 } from './letters-1';
import { letters2 } from './letters-2';
import { letters3 } from './letters-3';
import { letters4 } from './letters-4';
import letters5 from './letters-5';
import { letters6 } from './letters-6';
import { letters7 } from './letters-7';
import { letters8 } from './letters-8';
import { letters9 } from './letters-9';
import { letters10 } from './letters-10';

export const getWordList = (wordLength: number) => {
  switch (Number(wordLength)) {
    case 1:
      return letters1;
    case 2:
      return letters2;
    case 3:
      return letters3;
    case 4:
      return letters4;
    case 5:
      return letters5;
    case 6:
      return letters6;
    case 7:
      return letters7;
    case 8:
      return letters8;
    case 9:
      return letters9;
    case 10:
      return letters10;
    default:
      return letters5; //[];
  }
};

export {
  letters1,
  letters2,
  letters3,
  letters4,
  letters5,
  letters6,
  letters7,
  letters8,
  letters9,
  letters10,
};
