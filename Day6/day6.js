// const races = [
//   { time: 7, record: 9 },
//   { time: 15, record: 40 },
//   { time: 30, record: 200 },
// ];

// const races = [
//     { time: 71530, record: 940200 }
//   ];

const waysToWinProduct = races.reduce((currProduct, currRace) => {
  const { time, record } = currRace;
  let waysToWin = 0;
  for (let i = 1; i < time; i++) {
    let speed = i;
    let distanceTraveled = speed * (time - speed);
    if (distanceTraveled > record) waysToWin++;
    // console.log(`Speed: ${speed}, Distance Traveled: ${distanceTraveled}`);
  }
  return currProduct * waysToWin;
}, 1);

console.log(waysToWinProduct);

