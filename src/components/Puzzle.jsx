import { useState, useEffect, useRef } from 'react';

const CharacterSelectionModal = (props) => {
  // Modal visibility controls
  const hide = props.show_modal ? "block" : "none";
  const closeModal = props.closeModal;
  // Image, Page, & Window Click Coordinates
  const [[imageX, imageY], [pageX, pageY], [windX, windY]] = [props.image_loc, props.page_loc, props.window_loc];
  // Used to get the height of Modal
  const elementRef = useRef(null);
  // Used to switch modal up or down
  const [modalUp, setModalUp] = useState(20);

  // Modal open upwards if close to bottom of window
  useEffect(() => {
    const modalUpCondition = window.innerHeight - elementRef.current.clientHeight;
    if (windY > modalUpCondition) {
      setModalUp(elementRef.current.clientHeight - 20);
    } else {
      setModalUp(20);
    }
  }, [hide]);

  // Close modal when pressing escape
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") { closeModal(); };
    };
    document.addEventListener("keydown", handleKeydown);
  });

  // URI formatter
  function uriFormatter(gameName) {
    return `http://free.local:3000/${gameName}`
  };

  // URI formatter
  function fetchBodyFormatter(locationName, locX, locY, score = null) {
    const result = {
      location: locationName,
      locX: locX,
      locY: locY,
      score: score,
    }
    return JSON.stringify(result);
  };

  // An array for the goal's display names
  const displayNames = [];
  for (const key in props.goal_names) {
    displayNames.push(props.goal_names[key].display);
  };

  // An array for the goal's functions
  const goalFunctions = [];
  for (const key in props.goal_names) {
    goalFunctions.push(function(){
      const sendGoal = async () => {
        const result = await fetch(uriFormatter(props.game_name), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: fetchBodyFormatter(props.goal_names[key].name, imageX, imageY, props.game_data.score)
        })
        let jsonData;
        if (!result.ok) {
          throw new Error("Could not fetch data");
        } else {
          jsonData = await result.json();
          props.set_game_data(jsonData);
        }
      };
      sendGoal();
      closeModal();
    });
  }

  return (
    <div>
      <div className="character-selection-radius" style={{display: hide, top: pageY - 17, left: pageX - 17}}>
      </div>
      <div className="character-selection-modal" id="imageModal" style={{display: hide, top: pageY - modalUp, left: pageX + 20}} ref={elementRef}>
        <span className="modal-x-button" onClick={closeModal}>&times;</span>
        {displayNames.map( (key, index) => {
          return( <div key={index}><p><span onClick={goalFunctions[index]}>{key}</span></p></div> )
        })}
      </div>
    </div>
  )
};

const Checks = (props) => {
  const gameData = props.game_data
  const [locationWin, setLocationWin] = useState([false, false, false]);

  useEffect(() => {
    if (gameData.location === "first") {
      const wins = locationWin;
      wins[0] = gameData.success;
      setLocationWin(wins);
    };
    if (gameData.location === "second") {
      const wins = locationWin;
      wins[1] = gameData.success;
      setLocationWin(wins);
    };
    if (gameData.location === "third") {
      const wins = locationWin;
      wins[2] = gameData.success;
      setLocationWin(wins);
    };
  }, [props.game_data]);

  return (
    <div id="checks" >
      <span style={{margin: "20px"}}>
        {locationWin[0] ? "✅" : "❌"}
      </span>
      <span style={{margin: "20px"}}>
        {locationWin[1] ? "✅" : "❌"}
      </span>
      <span style={{margin: "20px"}}>
        {locationWin[2] ? "✅" : "❌"}
      </span>
    </div>
  )
};

// Thanks to PaunescuDragos-99 / waldo-game-frontend
// I didnt' have to knowledge to gather coordinates
const Puzzle = (props) => {
  const [showModal, setShowModal] = useState(false);

  const [imageLoc, setImageLoc] = useState([0, 0]);
  const [pageLoc, setPageLoc] = useState([0, 0]);
  const [windowLoc, setWindowLoc] = useState([0, 0]);

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
      <CharacterSelectionModal
        show_modal={showModal}
        page_loc={pageLoc}
        image_loc={imageLoc}
        window_loc={windowLoc}
        closeModal={modalOff}
        goal_names={props.goalNames}
        game_name={props.gameName}
        game_data={gameData}
        set_game_data={setGameData}
      />
      <Checks game_data={gameData}/>
      <img className="puzzle" onClick={handleClick} src={props.pic} />
    </>
  )
}

export default Puzzle;
