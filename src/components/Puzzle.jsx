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

  // Class automatically formats data for API
  class DataFormatter {
    constructor(gameName, goalName) {
      this.gameName = gameName;
      this.goalName = goalName;
      this.loc = [imageX, imageY];
    }
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
      console.log(JSON.stringify(new DataFormatter(props.game_name, props.goal_names[key].name)));
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

// Thanks to PaunescuDragos-99 / waldo-game-frontend
// I didnt' have to knowledge to gather coordinates
const Puzzle = (props) => {
  const [showModal, setShowModal] = useState(false);

  const [imageLoc, setImageLoc] = useState([0, 0]);
  const [pageLoc, setPageLoc] = useState([0, 0]);
  const [windowLoc, setWindowLoc] = useState([0, 0]);

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
      />
      <img className="puzzle" onClick={handleClick} src={props.pic} />
    </>
  )
}

export default Puzzle;
