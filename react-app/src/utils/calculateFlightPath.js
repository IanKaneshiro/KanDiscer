// export const calculateDisc = (disc) => {
//   const flightArray = [];

//   for (let i = 0; i <= 600; i += 25) {
//     const data = { distance: i, number: 0 };

//     if (disc.speed <= 4) {
//       if (i === 200) {
//         data.number = disc.fade / 6;
//       } else if (i === 225) {
//         data.number = disc.fade / 2;
//       } else if (i === 250) {
//         data.number = disc.fade;
//       } else if (i > 250) {
//         data.number = null;
//       }
//     } else if (disc.speed <= 6) {
//       if (i === 100) {
//         data.number = disc.turn / 6;
//       } else if (i === 125) {
//         data.number = disc.turn / 3;
//       } else if (i === 150) {
//         data.number = disc.turn / 2;
//       } else if (i === 175) {
//         data.number = disc.turn / 1.5;
//       } else if (i === 200) {
//         data.number = disc.turn / 1.2;
//       } else if (i === 225) {
//         data.number = disc.turn;
//       }
//       if (i === 250) {
//         data.number = disc.fade / 6;
//       } else if (i === 275) {
//         data.number = disc.fade / 2;
//       } else if (i === 300) {
//         data.number = disc.fade;
//       } else if (i > 300) {
//         data.number = null;
//       }
//     } else if (disc.speed <= 9) {
//       if (i === 350) {
//         data.number = disc.fade / 6;
//       } else if (i === 375) {
//         data.number = disc.fade / 2;
//       } else if (i === 400) {
//         data.number = disc.fade;
//       } else if (i > 400) {
//         data.number = null;
//       }
//     } else if (disc.speed <= 11) {
//       if (i === 400) {
//         data.number = disc.fade / 6;
//       } else if (i === 425) {
//         data.number = disc.fade / 2;
//       } else if (i === 450) {
//         data.number = disc.fade;
//       } else if (i > 450) {
//         data.number = null;
//       }
//     } else if (disc.speed <= 15) {
//       if (i === 450) {
//         data.number = disc.fade / 6;
//       } else if (i === 475) {
//         data.number = disc.fade / 2;
//       } else if (i === 500) {
//         data.number = disc.fade;
//       } else if (i > 500) {
//         data.number = null;
//       }
//     }

//     flightArray.push(data);
//   }
//   return flightArray;
// };

const calculateDistance = (disc) => {
  let distance;
  if (disc.speed <= 4) {
    distance = 250;
  } else if (disc.speed <= 6) {
    distance = 300;
  } else if (disc.speed <= 9) {
    distance = 350;
  } else if (disc.speed <= 11) {
    distance = 400;
  } else if (disc.speed <= 15) {
    distance = 450;
  }
  return distance;
};

export const calculateFlightChart = (disc) => {
  const distance = calculateDistance(disc);
  const quarter = distance / 4;
  const turnRange = quarter * 3;
  const fadeRange = quarter;
  const turnIncrements = Math.ceil((turnRange - 100) / 25);
  const fadeIncrements = Math.ceil(fadeRange / 25);
  const turnIncrementAmount = disc.turn / turnIncrements;
  const fadeIncrementAmount = disc.fade / fadeIncrements;

  let turnIdx = 0;
  let fadeIdx = 0;
  let turnAmount = turnIncrementAmount;
  let fadeAmount = turnAmount;
  const flightChart = [];
  console.log(`Turn range is ${turnRange}, fade range is ${fadeRange}`);
  console.log(
    `Turn increments ${turnIncrements}, fade incremnets ${fadeIncrements}`
  );
  console.log(`turn amount ${turnAmount}, fade amount${fadeAmount}`);
  console.log(
    `Turn increments amount ${turnIncrementAmount}, fade incremnets amount ${fadeIncrementAmount}`
  );

  for (let i = 0; i <= 500; i += 25) {
    const data = { distance: i, number: 0 };
    if (i >= 100 && i <= turnRange && turnIdx < turnIncrements) {
      data.number = turnAmount;
      turnIdx++;
      turnAmount += turnIncrementAmount;
    }

    if (i >= turnRange && fadeIdx <= fadeIncrements) {
      if (fadeIdx === 0) {
        data.number = turnAmount + fadeIncrementAmount;
        fadeAmount = turnAmount + fadeIncrementAmount;
      } else {
        data.number = fadeAmount + fadeIncrementAmount;
        fadeAmount += fadeIncrementAmount;
      }
      fadeIdx++;
    }

    if (i > distance) data.number = null;
    flightChart.push(data);
  }
  return flightChart;
};

const test = calculateFlightChart({ turn: -2, fade: 1, speed: 9 });
console.log(test);
