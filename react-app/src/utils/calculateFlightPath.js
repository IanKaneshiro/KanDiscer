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

  for (let i = 0; i <= 500; i += 25) {
    const data = { distance: i, number: 0 };
    if (i >= 100 && i <= turnRange && turnIdx < turnIncrements) {
      data.number = turnAmount;
      turnIdx++;
      turnAmount += turnIncrementAmount;
    }

    // Add conditionals for if there is no turn
    if (i >= turnRange && fadeIdx <= fadeIncrements) {
      if (disc.turn < 0) {
        if (fadeIdx === 0) {
          data.number = turnAmount + fadeIncrementAmount;
          fadeAmount = turnAmount + fadeIncrementAmount;
        } else {
          data.number = fadeAmount + fadeIncrementAmount;
          fadeAmount += fadeIncrementAmount;
        }
        fadeIdx++;
      } else {
        fadeIdx++;
        data.number = fadeAmount + fadeIncrementAmount;
        fadeAmount += fadeIncrementAmount;
      }
    }

    if (i > distance) data.number = null;
    flightChart.push(data);
  }
  return flightChart;
};
