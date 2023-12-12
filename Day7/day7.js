const input = require("./input");

const cardRank = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]; // Move J to beginning for part 2

const findDuplicateCharactersPart1 = (str) => {
  const charCount = new Map();
  const result = [];
  for (const char of str) {
    const currentCount = charCount.get(char) || 0;
    charCount.set(char, currentCount + 1);
  }
  charCount.forEach((count, char) => {
    if (count > 1) {
      const repeatedChars = char.repeat(count);
      result.push(repeatedChars);
    }
  });

  return result;
};

const findDuplicateCharactersPart2 = (str) => {
  const charCount = new Map();
  const result = [];
  const jokerCount = str
    .split("")
    .reduce((total, curr) => (total += curr === "J" ? 1 : 0), 0);

  for (const char of str) {
    const currentCount = charCount.get(char) || 0;
    charCount.set(char, currentCount + 1);
  }
  charCount.forEach((count, char) => {
    if (count > 1) {
      const repeatedChars = char.repeat(count);
      result.push(repeatedChars);
    }
  });

  result.sort((a, b) => {
    return a[0] !== "J" ? -1 : 1; 
  });

  if ((result.length === 0) & (jokerCount > 0)) {
    result[0] = "JJ";
  } else if (result.length === 1 && result[0].split('').every(value => value === 'J') && jokerCount < 5) {
    result[0] += 'J';
  } else if (result.length !== 0 && result[0][0] !== "J") {
    for (let i = 0; i < jokerCount; i++) {
      result[0] += "J";
    }
  }

  // console.log(str, jokerCount, result);

  return result;
};

const compareHands = (a, b) => {
  const firstHandMatches = findDuplicateCharactersPart1(a.split(" ")[0]); // switch to findDuplicateCharactersPart2 for part 2
  const secondHandMatches = findDuplicateCharactersPart1(b.split(" ")[0]); // switch to findDuplicateCharactersPart2 for part 2
  let handStrengths = [];

  [firstHandMatches, secondHandMatches].forEach((hand, index) => {
    if (hand.length === 0) handStrengths[index] = 1; // No pair, high card
    else if (hand.length === 1) {
      if (hand[0].length === 5) handStrengths[index] = 7; // Five of a kind
      if (hand[0].length === 4) handStrengths[index] = 6; // Four of a kind
      if (hand[0].length === 3) handStrengths[index] = 4; // Three of a kind
      if (hand[0].length === 2) handStrengths[index] = 2; // One pair
    } else if (hand.length === 2) {
      if (hand[0].length === 5 || hand[1].length === 5)
        handStrengths[index] = 7; // Five of a kind, part 2 only
      if (hand[0].length === 4 || hand[1].length === 4)
        handStrengths[index] = 6; // Four of a kind, part 2 only
      if ((hand[0].length === 3 && hand[1].length === 2) || (hand[1].length === 3 && hand[0].length === 2)) 
        handStrengths[index] = 5; // Full house
      if (hand[0].length === 2 && hand[1].length === 2)
        handStrengths[index] = 3; // Two pair
    }
  });

  if (handStrengths[0] === handStrengths[1]) {
    let index = 0;
    while (index < 5) {
      if (cardRank.indexOf(a[index]) === cardRank.indexOf(b[index])) {
        index++;
      } else {
        return cardRank.indexOf(a[index]) > cardRank.indexOf(b[index]) ? 1 : -1;
      }
    }
  }
  return handStrengths[0] > handStrengths[1] ? 1 : -1;
};

const sortedHands = [...input].sort(compareHands);

const calculateWinnings = sortedHands.reduce((totalWinnings, hand, index) => {
  const bid = parseInt(hand.split(" ")[1]);

  return (totalWinnings += bid * (index + 1));
}, 0);

console.log(calculateWinnings);
