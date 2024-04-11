export default class Game {
  constructor(
    name,
    image,
    firstName,
    firstDisplay,
    secondName,
    secondDisplay,
    thirdName,
    thirdDisplay
  ) {
    this.gameName = name;
    this.image = image;
    this.goalNames = {
      goalOne: { name: firstName, display: firstDisplay},
      goalTwo: { name: secondName, display: secondDisplay},
      goalThree: { name: thirdName, display: thirdDisplay},
    }
  }
}
