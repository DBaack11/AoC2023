const testInput = require("./input");


// ################################# PART 1 #################################
const numericSum = (input) => input.reduce((currSum, currValue) => {
  const digits = currValue.replace(/[^0-9]/g, "");
  const valueToAdd = digits[0] + digits[digits.length - 1];

  return parseInt(currSum) + parseInt(valueToAdd);
}, 0);

console.log('Part 1:', numericSum(testInput));


// ################################# PART 2 #################################
const alphaDigits = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "4",
  five: "5e",
  six: "6",
  seven: "7n",
  eight: "e8t",
  nine: "n9e",
};

const convertedAlphaDigits = testInput.map((currValue) => {
  let newValue = currValue;
  Object.keys(alphaDigits).map(key => {
    const regex = new RegExp(`${key}`, 'g')
    newValue = newValue.replace(regex, alphaDigits[key]);
  });
  return newValue;
});

console.log('Part 2:', numericSum(convertedAlphaDigits))

