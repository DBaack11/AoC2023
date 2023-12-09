const input = require("./input");

// ################################# PART 1 #################################
const totalPoints = input.reduce((currSum, currCard) => {
  let currentPoints = 0.5;
  const startIndex = currCard.indexOf(":"), winningNumbersEnd = currCard.indexOf("|");
  const winningNumbers = currCard.substring(startIndex, winningNumbersEnd).match(/[0-9]{1,2}/g);
  const numbersToCheck = currCard.substring(winningNumbersEnd).match(/[0-9]{1,2}/g);

  for (num of numbersToCheck) {
    if (winningNumbers.includes(num)) currentPoints *= 2;
  }

  return (currSum += currentPoints === 0.5 ? 0 : currentPoints);
}, 0);

console.log("Part 1 Answer:", totalPoints);


// ################################# PART 2 #################################
const totalCards = input.reduce((cardInstances, currCard, index) => {
  let numMatches = 0;
  const startIndex = currCard.indexOf(":"), winningNumbersEnd = currCard.indexOf("|");
  const winningNumbers = currCard.substring(startIndex, winningNumbersEnd).match(/[0-9]{1,2}/g);
  const numbersToCheck = currCard.substring(winningNumbersEnd).match(/[0-9]{1,2}/g);

  for (num of numbersToCheck) {
    if (winningNumbers.includes(num)) numMatches++;
  }

  if (numMatches > 0) {
    for (let i = 1; i <= numMatches; i++) {
      cardInstances[index + i] += cardInstances[index];
    }
  }

  return cardInstances;
}, Array(input.length).fill(1));

console.log("Part 2 Answer:", totalCards.reduce((a, b) => a + b, 0));
