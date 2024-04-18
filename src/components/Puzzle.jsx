import { useState, useEffect, useRef } from 'react';
import GoalSelectionModal from './GoalSelectionModal';
import Checks from './Checks';

// Thanks to PaunescuDragos-99 / waldo-game-frontend
// I didnt' have to knowledge to gather coordinates
const Puzzle = (props) => {
  const [showModal, setShowModal] = useState(false);

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

  // Call API when puzzle loads
  useEffect(() => {
    const reqConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const uri = `http://free.local:3000/${props.gameName}`;
    const result = fetch(uri, reqConfig);
    result
      .then(response => {return response.json()})
      .then(data => setGameData(data));
  }, []);

  useEffect(() => {
    console.log(gameData);
  },[gameData])

  return(
    <>
      {/* I need to be consistent with the prop names... */}
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
      <Checks game_data={gameData} goal_names={props.goalNames} />
      <img className="puzzle" onClick={handleClick} src={props.pic} />
    </>
  )
}

export default Puzzle;
