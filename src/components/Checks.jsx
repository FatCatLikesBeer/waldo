import { useState, useEffect } from 'react';

// Checkmark indicators
const Checks = (props) => {
  const gameData = props.game_data;
  const goalNames = props.goal_names;
  const goalIndicators = props.goal_indicators;
  const setGoalIndicators = props.set_goal_indicators;

  useEffect(() => {
    const wins = [...goalIndicators];
    if (gameData.location === "first") {
      wins[0] = gameData.success ? "🟢" : "❌";
    };
    if (gameData.location === "second") {
      wins[1] = gameData.success ? "🟢" : "❌";
    };
    if (gameData.location === "third") {
      wins[2] = gameData.success ? "🟢" : "❌";
    };
    setGoalIndicators(wins);
  }, [gameData]);

  return (
    <div id="checks" style={{display: "flex", margin: "0px auto 20px", maxWidth: "200px", justifyContent: "space-between"}}>
      <div style={{margin: "0px 20px"}}>
        {goalIndicators[0]}
        <br />
        {goalNames.goalOne.display}
      </div>
      <div style={{margin: "0px 20px"}}>
        {goalIndicators[1]}
        <br />
        {goalNames.goalTwo.display}
      </div>
      <div style={{margin: "0px 20px"}}>
        {goalIndicators[2]}
        <br />
        {goalNames.goalThree.display}
      </div>
    </div>
  )
};

export default Checks
