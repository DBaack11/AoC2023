const input = require("./input");

const MAX_ROWS = input.length - 1;
const MAX_COLUMNS = input[0].length - 1;

// ################################# PART 1 #################################
const foundNumbers = [];
let partNumbersSum = 0;

const retrieveAdjacentCharacters = (obj) => {
  const { value, length, row, indexInRow } = obj;
  let result = {};

  result["topLeft"] =
    row === 0 || indexInRow === 0 ? "." : input[row - 1][indexInRow - 1];
  // left edge
  result["left"] = indexInRow === 0 ? "." : input[row][indexInRow - 1];
  // bottom left
  result["bottomLeft"] =
    row === MAX_ROWS || indexInRow === 0 ? "." : input[row + 1][indexInRow - 1];
  // top right
  result["topRight"] =
    row === 0 || indexInRow + length > MAX_COLUMNS
      ? "."
      : input[row - 1][indexInRow + length];
  // right edge
  result["right"] =
    indexInRow + length > MAX_COLUMNS ? "." : input[row][indexInRow + length];
  // bottom right
  result["bottomRight"] =
    row === MAX_ROWS || indexInRow + length > MAX_COLUMNS
      ? "."
      : input[row + 1][indexInRow + length];

  // dynamic top and bottom locations
  for (let i = 0; i < length; i++) {
    result[`top${i + 1}`] = row === 0 ? "." : input[row - 1][indexInRow + i];
    result[`bottom${i + 1}`] =
      row === MAX_ROWS ? "." : input[row + 1][indexInRow + i];
  }

  result["value"] = value;
  result["row"] = row;
  result["indexInRow"] = indexInRow;

  return result;
};

// Iterate through the matrix to find every number or asterisk and store it with its length, row, and indexInRow (column)
const findNumbersOrAsterisks = (regex, arrayToPopulate) => {
  for (const [rowIndex, rowValue] of input.entries()) {
    let charIndex = 0;
    while (charIndex < rowValue.length) {
      if (regex.test(rowValue[charIndex])) {
        let num = "";
        let startIndex = charIndex;
        while (
          startIndex < rowValue.length &&
          regex.test(rowValue[startIndex])
        ) {
          num += rowValue[startIndex];
          startIndex++;
        }
        arrayToPopulate.push({
          value: num,
          length: num.length,
          row: rowIndex,
          indexInRow: charIndex,
        });
        charIndex = startIndex;
      } else {
        charIndex++;
      }
    }
  }
};

findNumbersOrAsterisks(/\d/, foundNumbers);

// Iterate through foundNumbers and retrieve/evaluate the adjacent characters
for (const obj of foundNumbers) {
  const result = retrieveAdjacentCharacters(obj);

  if (
    Object.values(result).some((char) => char !== "." && isNaN(parseInt(char)))
  ) {
    partNumbersSum += parseInt(result.value);
  }
}

console.log("Part 1 Answer:", partNumbersSum);


// ################################# PART 2 #################################
const foundAsterisks = [];
let gearRatioSum = 0;

const retrieveNumber = (row, indexInRow) => {
  let num = input[row][indexInRow];
  let movingLeftIndex = indexInRow;
  let movingRightIndex = indexInRow;

  while (/\d/.test(input[row][movingLeftIndex - 1])) {
    num = input[row][movingLeftIndex - 1] + num;
    movingLeftIndex--;
  }

  while (/\d/.test(input[row][movingRightIndex + 1])) {
    num = num + input[row][movingRightIndex + 1];
    movingRightIndex++;
  }

  return num;
};

findNumbersOrAsterisks(/\*/, foundAsterisks);

// Iterate through foundAsterisks, retrieve adjacent characters, and retrieve/evaluate gear numbers
for (const obj of foundAsterisks) {
  const result = retrieveAdjacentCharacters(obj);
  const gears = [];

  const locations = {
    top1: { row: -1, indexInRow: 0 },
    topLeft: { row: -1, indexInRow: -1 },
    left: { row: 0, indexInRow: -1 },
    bottomLeft: { row: 1, indexInRow: -1 },
    bottom1: { row: 1, indexInRow: 0 },
    bottomRight: { row: 1, indexInRow: 1 },
    right: { row: 0, indexInRow: 1 },
    topRight: { row: -1, indexInRow: 1 },
  };

  Object.entries(result).forEach(([key, char]) => {
    if (/\d/.test(char) && !["value", "row", "indexInRow"].includes(key)) {
      const { row: currRow, indexInRow: currIndexInRow } = result;
      const { row, indexInRow } = locations[key];

      const gear = retrieveNumber(currRow + row, currIndexInRow + indexInRow);
      if (!gears.includes(gear)) gears.push(gear);
    }
  });

  if (gears.length === 2) {
    gearRatioSum += parseInt(gears[0]) * parseInt(gears[1]);
  }
}
// edge case to accommodate for: if two separate gears are the same number
console.log("Part 2 Answer:", gearRatioSum);
