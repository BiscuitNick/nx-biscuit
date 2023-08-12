export const handTitles = [
  'Royal Flush',
  'Straight Flush',
  'Four of a Kind',
  'Full House',
  'Flush',
  'Straight',
  'Three of a Kind',
  'Two Pair',
  'Jacks or Better',
] as const;

export interface PayoutSchedule {
  [key: string]: number[];
}

export const payouts96old: PayoutSchedule = {
  'Royal Flush': [250, 500, 750, 1000, 4000],
  'Straight Flush': [50, 100, 150, 200, 250],
  'Four of a Kind': [25, 50, 75, 100, 125],
  'Full House': [9, 18, 27, 36, 45],
  Flush: [6, 12, 18, 24, 30],
  Straight: [4, 8, 12, 16, 20],
  'Three of a Kind': [3, 6, 9, 12, 15],
  'Two Pair': [2, 4, 6, 8, 10],
  'Jacks or Better': [1, 2, 3, 4, 5],
  'Low Pair': [0, 0, 0, 0, 0],
  'High Card': [0, 0, 0, 0, 0],
};

export const handValues = [
  '900',
  '800',
  '700',
  '600',
  '500',
  '400',
  '300',
  '200',
  '110',
  // '100',
  '0',
];

export const payouts96: PayoutSchedule = {
  900: [250, 500, 750, 1000, 4000],
  800: [50, 100, 150, 200, 250],
  700: [25, 50, 75, 100, 125],
  600: [9, 18, 27, 36, 45],
  500: [6, 12, 18, 24, 30],
  400: [4, 8, 12, 16, 20],
  300: [3, 6, 9, 12, 15],
  200: [2, 4, 6, 8, 10],
  110: [1, 2, 3, 4, 5],
  100: [0, 0, 0, 0, 0],
  0: [0, 0, 0, 0, 0],
};

export interface ranksString {
  [key: string]: string;
}

export const cardRanks: ranksString = {
  13: 'A',
  12: 'K',
  11: 'Q',
  10: 'J',
  9: 'T',
  8: '9',
  7: '8',
  6: '7',
  5: '6',
  4: '5',
  3: '4',
  2: '3',
  1: '2',
};

export const handValueTitles: ranksString = {
  900: 'Royal Flush',
  800: 'Straight Flush',
  700: 'Four of a Kind',
  600: 'Full House',
  500: 'Flush',
  400: 'Straight',
  300: 'Three of a Kind',
  200: 'Two Pair',
  110: 'Jacks or Better',
  100: 'Low Pair',
  0: 'High Card',
};

export interface valueCounts {
  [key: string]: number;
}

export const valueCounter: valueCounts = {
  900: 0,
  800: 0,
  700: 0,
  600: 0,
  500: 0,
  400: 0,
  300: 0,
  200: 0,
  110: 0,
  100: 0,
  0: 0,
};

export const valueCounterAllPairs: valueCounts = {
  900: 0,
  800: 0,
  700: 0,
  600: 0,
  500: 0,
  400: 0,
  300: 0,
  200: 0,
  113: 0,
  112: 0,
  111: 0,
  110: 0,
  109: 0,
  108: 0,
  107: 0,
  106: 0,
  105: 0,
  104: 0,
  103: 0,
  102: 0,
  101: 0,
  100: 0,
  0: 0,
};

// export const standardDeck = [...Array(52).keys()];
