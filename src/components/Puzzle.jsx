import { useState, useEffect, useRef } from 'react';

const CharacterSelectionModal = (props) => {
  // Controlls modal visibility
  const hide = props.show_modal ? "block" : "none";
  const closeModal = props.closeModal;
  // Image Click Coordinates
  const imageX = props.image_loc[0];
  const imageY = props.image_loc[1];
  // Page Click Coordinates
  const pageX = props.page_loc[0];
  const pageY = props.page_loc[1];
  // Window Click Coordinates
  const windX = props.window_loc[0];
  const windY = props.window_loc[1];
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

  const goalNames = {...props.goal_names};

  const sendMe = {
    nameOne: goalNames.goalOne,
    nameTwo: goalNames.goalTwo,
    nameThree: goalNames.goalThree,
    sendOne: function() { console.log(JSON.stringify({ name: sendMe.nameOne, loc: [imageX, imageY]})) },
    sendTwo: function() { console.log(JSON.stringify({ name: sendMe.nameTwo, loc: [imageX, imageY]})) },
    sendThree: function() { console.log(JSON.stringify({ name: sendMe.nameThree, loc: [imageX, imageY]})) },
  }


  return (
    <div>
      <div className="character-selection-radius" style={{display: hide, top: pageY - 17, left: pageX - 17}}>
      </div>
      <div className="character-selection-modal" id="imageModal" style={{display: hide, top: pageY - modalUp, left: pageX + 20}} ref={elementRef}>
        <span className="modal-x-button" onClick={closeModal}>&times;</span>
        <div><p><span onClick={sendMe.sendOne}>Image 1</span></p></div>
        <div><p><span onClick={sendMe.sendTwo}>Image 2</span></p></div>
        <div><p><span onClick={sendMe.sendThree}>Image 3</span></p></div>
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
    // Page Click Coordinates
    const pageX = e.pageX;
    const pageY = e.pageY;
    // Window Click Coordinates
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
      <CharacterSelectionModal
        show_modal={showModal}
        page_loc={pageLoc}
        image_loc={imageLoc}
        window_loc={windowLoc}
        closeModal={modalOff}
        goal_names={props.goalNames}
      />
      <img className="puzzle" onClick={handleClick} src={props.pic} />
    </>
  )
}

export default Puzzle;
