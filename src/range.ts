function columnToLetter(column: number) {
  var temp,
    letter = "";
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter: string) {
  var column = 0,
    length = letter.length;
  for (var i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

export const calculateRange = (
  startRow: number,
  startCol: number,
  numberOfRow: number | "all" = 1,
  numberOfCol: number | "all" = 1,
  sheetName?: string
) => {
  if (startCol < 1 || startCol < 1) return undefined;
  if (numberOfCol === "all" && numberOfRow === "all") return undefined;
  let range = columnToLetter(startCol) + startRow;

  if (
    numberOfRow !== "all" &&
    numberOfCol !== "all" &&
    numberOfCol + numberOfRow < 3
  )
    return range;

  range = range + ":";

  if (numberOfRow === "all") {
    range = range + columnToLetter(startCol + Number(numberOfCol) - 1);
  } else if (numberOfCol != "all") {
    range = range + columnToLetter(startCol + Number(numberOfCol) - 1);
  }

  if (numberOfCol === "all") {
    range = range + (startRow + Number(numberOfRow) - 1);
  } else if (numberOfRow != "all") {
    range = range + (startRow + Number(numberOfRow) - 1);
  }
  if (sheetName) {
    range = sheetName + "!" + range;
  }

  return range;
};
