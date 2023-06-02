const generateTraffic = (lanes) => {
  const distance = -150;
  const maxLength = -10000;
  let spawnProbability = 0.2;
  const probIncrement = 1 / (maxLength / distance) / 3;

  const traffic = [new Car(road.getLaneCenter(2), -200, 30, 50, "DUMMY", 2.5)];
  for (let i = -350; i > maxLength; i += distance) {
    // console.log(i);
    for (let l = 0; l < lanes; l++) {
      // console.log(Math.random());
      if (Math.random() < spawnProbability) {
        // console.log(l, i);
        traffic.push(new Car(road.getLaneCenter(l), i, 30, 50, "DUMMY", 2.5));
        spawnProbability += probIncrement;
      }
    }
  }
  return traffic;

  // return [
  //   new Car(road.getLaneCenter(2), -100, 30, 50, "DUMMY", 2.5),
  //   //   new Car(road.getLaneCenter(4), -100, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(0), -250, 30, 50, "DUMMY", 2.5),
  //   //   new Car(road.getLaneCenter(1), -250, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(3), -400, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(4), -400, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(3), -400, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(4), -400, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(0), -550, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(1), -550, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(4), -700, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(1), -850, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(4), -850, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(0), -1000, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(3), -1000, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(0), -1200, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(2), -1200, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(3), -1200, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(0), -1400, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(3), -1400, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(4), -1400, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(2), -1600, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(3), -1600, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(4), -1600, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(0), -1800, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(1), -1800, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(2), -1800, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(0), -2000, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(1), -2000, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(3), -2000, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(4), -2000, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(0), -2200, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(2), -2200, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(3), -2200, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(4), -2200, 30, 50, "DUMMY", 2.5),

  //   new Car(road.getLaneCenter(0), -2400, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(1), -2400, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(2), -2400, 30, 50, "DUMMY", 2.5),
  //   new Car(road.getLaneCenter(4), -2400, 30, 50, "DUMMY", 2.5),
  // ];
};
