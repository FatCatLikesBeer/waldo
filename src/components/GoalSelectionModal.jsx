import { useState, useRef, useEffect } from 'react';

const GoalSelectionModal = (props) => {
  // Modal visibility controls
  const hide = props.show_modal ? "block" : "none";
  const closeModal = props.close_modal;
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

export default GoalSelectionModal;
