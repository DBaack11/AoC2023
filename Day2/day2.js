const input = require("./input");

// ################################# PART 1 #################################
const MAX_VALUES = { red: 12, green: 13, blue: 14 };
let gameIdSum = 0;

input.forEach((game) => {
  let isGamePossible = true;
  const gameId = game.slice(5, game.indexOf(":"));
  const regex = (color) => new RegExp(`[0-9]{1,2} ${color}`, "g");

  for (const color of ["red", "green", "blue"]) {
    [...game.matchAll(regex(color))].forEach((result) => {
      if (parseInt(result[0].slice(0, 2).trim()) > MAX_VALUES[color])
        isGamePossible = false;
    });

    if (!isGamePossible) return;
  }

  if (isGamePossible) gameIdSum += parseInt(gameId);
});

console.log('Part 1 Answer:', gameIdSum);


// ################################# PART 2 #################################
let powerSum = 0;
for (game of input) {
  const MIN_VALUES = { red: 0, green: 0, blue: 0 };

  const regex = (color) => new RegExp(`[0-9]{1,2} ${color}`, "g");
  for (const color of ["red", "green", "blue"]) {
    [...game.matchAll(regex(color))].forEach((result) => {
      const currElement = parseInt(result[0].slice(0, 2).trim());
      if (currElement > MIN_VALUES[color]) MIN_VALUES[color] = currElement;
    });
  }
  powerSum += Object.values(MIN_VALUES).reduce((currValue, currElement) => currValue * currElement);
}

console.log('Part 2 Answer:', powerSum);
