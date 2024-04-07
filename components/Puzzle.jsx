import pic from '../src/assets/pic1.jpg';
import { useState, useEffect, useRef } from 'react';

const CharacterSelectionModal = (props) => {
  const hide = props.show_modal ? "block" : "none";
  const closeModal = props.closeModal;
  const imageX = props.image_loc[0];
  const imageY = props.image_loc[1];
  const pageX = props.page_loc[0];
  const pageY = props.page_loc[1];
  const windX = props.window_loc[0];
  const windY = props.window_loc[1];
  const elementRef = useRef(null);
  const [modalUp, setModalUp] = useState(0);

  // Making Modal open upwards if close to bottom of window
  useEffect(() => {
    if (elementRef.current) {
      if (props.show_modal) {
        const modalUpCondition = window.innerHeight - elementRef.current.clientHeight;
        if (windY > modalUpCondition) {
          setModalUp(elementRef.current.clientHeight);
        } else {
          setModalUp(0);
        }
      }
    }
  }, [hide]);

  return (
    <div className="character-selection-modal" id="imageModal" style={{position: "absolute", display: hide, top: pageY - modalUp, left: pageX}} ref={elementRef}>
      <span style={{position: "absolute", left: 8, top: 0, cursor: "pointer"}} onClick={closeModal}>&times;</span>
      <p>Image X: {imageX}</p>
      <p>Image Y: {imageY}</p>
      <p>Page X: {pageX}</p>
      <p>Page Y: {pageY}</p>
      <p>Wind X: {windX}</p>
      <p>Wind Y: {windY}</p>
    </div>
  )
};

// Thanks to PaunescuDragos-99 / waldo-game-frontend
const Puzzle = () => {
  const [showModal, setShowModal] = useState(false);

  const [imageLoc, setImageLoc] = useState([0, 0]);
  const [pageLoc, setPageLoc] = useState([0, 0]);
  const [windowLoc, setWindowLoc] = useState([0, 0]);

  const handleClick = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    const imageX = e.pageX - left - window.scrollX;
    const imageY = e.pageY - top - window.scrollY;
    const pageX = e.pageX;
    const pageY = e.pageY;
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
      <CharacterSelectionModal show_modal={showModal} page_loc={pageLoc} image_loc={imageLoc} window_loc={windowLoc} closeModal={modalOff}/>
      <img className="puzzle" onClick={handleClick} src={pic} />
    </>
  )
}

export default Puzzle;
