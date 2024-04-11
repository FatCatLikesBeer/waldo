export default class Game {
  constructor(
    name,
    image,
    firstDisplay,
    firstName,
    secondDisplay,
    secondName,
    thirdDisplay,
    thirdName,
  ) {
    this.gameName = name;
    this.image = image;
    this.goalNames = {
      goalOne: { display: firstDisplay, name: firstName },
      goalTwo: { display: secondDisplay, name: secondName },
      goalThree: { display: thirdDisplay, name: thirdName },
    }
  }
}
