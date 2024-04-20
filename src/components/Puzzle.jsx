import { useState, useEffect, useRef } from 'react';
import GoalSelectionModal from './GoalSelectionModal';
import Checks from './Checks';
import GameWinModal from './GameWinModal';
import LeaderboardModal from './LeaderboardModal';

// Thanks to PaunescuDragos-99 / waldo-game-frontend
// I didnt' have to knowledge to gather coordinates
const Puzzle = (props) => {
  const gameName = props.gameName;
  const [showModal, setShowModal] = useState(false);
  const [gameWinModal, setGameWinModal] = useState(false);
  const [leaderboardModal, setLeaderboardModal] = useState(false);
  const [leaderboardResponse, setLeaderboardResposne] = useState("init leaderboard");
  const [goalIndicators, setGoalIndicators] = useState(["🟡", "🟡", "🟡"]);

  const [imageLoc, setImageLoc] = useState([0, 0]);
  const [pageLoc, setPageLoc] = useState([0, 0]);
  const [windowLoc, setWindowLoc] = useState([0, 0]);

  // Game data retrieved from API
  const [gameData, setGameData] = useState({message: "init"});

  const handleClick = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    // Image Click Coordinates
    const imageX = e.pageX - left - window.scrollX;
    const imageY = e.pageY - top - window.scrollY;
    // Page Click Coordinates: The page is the entire page
    const pageX = e.pageX;
    const pageY = e.pageY;
    // Window Click Coordinates: The window is the viewport boundry of the page
    const windX = e.clientX;
    const windY = e.clientY;

    setWindowLoc([windX, windY]);
    setImageLoc([Math.floor(imageX), Math.floor(imageY)]);
    setPageLoc([pageX, pageY]);

    setShowModal(!showModal);
  };

  const modalOff = () => {setShowModal(false)};

  // On puzzle load, fetch base game data from API
  useEffect(() => {
    const reqConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const uri = `https://letter-finder-api.fly.dev/${gameName}`;
    const result = fetch(uri, reqConfig);
    result
      .then(response => {return response.json()})
      .then(data => setGameData(data));
  }, []);

  // Close game win modal
  const closeGameWinModal = () => {
    setGameWinModal(false);
  };

  // Open game win modal if win
  useEffect(() => {
    if (gameData.win) { setGameWinModal(true) };
  },[gameData]);

  // Toggle leaderboard
  const toggleLeaderboard = () => {
    setLeaderboardModal(!leaderboardModal);
  };

  // Log stuff to console.
  // useEffect(() => {
  //   console.log("Game Data", gameData);
  // },[gameData])

  return(
    <>
      {/* I need to be consistent with the prop names... */}
      <div id="options_container" style={{position: "relative"}}>
        <Checks game_data={gameData}
          goal_names={props.goalNames}
          goal_indicators={goalIndicators}
          set_goal_indicators={setGoalIndicators}
        />
        <button id="show_leaderboard" onClick={toggleLeaderboard}>Leaderboard</button>
      </div>
      <GoalSelectionModal
        show_modal={showModal}
        page_loc={pageLoc}
        image_loc={imageLoc}
        window_loc={windowLoc}
        close_modal={modalOff}
        goal_names={props.goalNames}
        game_name={props.gameName}
        game_data={gameData}
        set_game_data={setGameData}
      />
      <GameWinModal
        show_game_win_modal={gameWinModal}
        close_game_win_modal={closeGameWinModal}
        game_name={gameName}
        score={gameData.score}
        leaderboard_response={leaderboardResponse}
        set_leaderboard_response={setLeaderboardResposne}
        set_game_data={setGameData}
        set_goal_indicators={setGoalIndicators}
      />
      <img className="puzzle" onClick={handleClick} src={props.pic} />
      <LeaderboardModal
        game_name={gameName}
        show_leaderboard={leaderboardModal}
        set_show_leaderboard={setLeaderboardModal}
      />
    </>
  )
}

export default Puzzle;
