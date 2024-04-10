export default class Game {
  constructor(name, image, firstGoal, secondGoal, thirdGoal) {
    this.gameName = name;
    this.image = image;
    this.goalNames = {
      goalOne: firstGoal,
      goalTwo: secondGoal,
      goalThree: thirdGoal,
    }
  }
}
