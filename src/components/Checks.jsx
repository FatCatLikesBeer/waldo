import { useState, useEffect } from 'react';

// Checkmark indicators
const Checks = (props) => {
  const gameData = props.game_data;
  const goalNames = props.goal_names;
  const [locationWin, setLocationWin] = useState(["🟡", "🟡", "🟡"]);

  useEffect(() => {
    const wins = [...locationWin];
    if (gameData.location === "first") {
      wins[0] = gameData.success ? "🟢" : "❌";
    };
    if (gameData.location === "second") {
      wins[1] = gameData.success ? "🟢" : "❌";
    };
    if (gameData.location === "third") {
      wins[2] = gameData.success ? "🟢" : "❌";
    };
    setLocationWin(wins);
  }, [gameData]);

  return (
    <div id="checks" style={{display: "flex", margin: "0px auto 20px", maxWidth: "200px", justifyContent: "space-between"}}>
      <div style={{margin: "0px 20px"}}>
        {locationWin[0]}
        <br />
        {goalNames.goalOne.display}
      </div>
      <div style={{margin: "0px 20px"}}>
        {locationWin[1]}
        <br />
        {goalNames.goalTwo.display}
      </div>
      <div style={{margin: "0px 20px"}}>
        {locationWin[2]}
        <br />
        {goalNames.goalThree.display}
      </div>
    </div>
  )
};

export default Checks
