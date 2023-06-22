export const alphabet = "abcdefghijklmnopqrstuvwxyz";

const qwertyRow1 = "qwertyuiop".split("");
const qwertyRow2 = "asdfghjkl".split("");
const qwertyRow3 = ["Enter", ..."zxcvbnm".split(""), "Backspace"];

export const QwertyNoSpacebar = [qwertyRow1, qwertyRow2, qwertyRow3];
export const QwertyWithSpacebar = [...QwertyNoSpacebar, ["Spacebar"]];
