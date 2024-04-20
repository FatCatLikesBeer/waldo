import { useState, useRef, useEffect } from 'react';

const GameWinModal = (props) => {
  const gameName = props.game_name;
  const score = props.score;
  const setGameData = props.set_game_data;
  const leaderboardResponse = props.leaderboard_resposne;
  const setLeaderboardResponse = props.set_leaderboard_response;
  const setGoalIndicators = props.set_goal_indicators;
  const [formData, setFormData] = useState({
    name: "",
    score: score,
    gameName: gameName,
  });
  const hide = props.show_game_win_modal ? "block" : "none";
  const closeModal = props.close_game_win_modal;

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Change score in form when score changes.
  useEffect(() => {
    setFormData({
      ...formData,
      score: score,
    })
  }, [score])

  // Validates length of name
  const isNameValid = () => {
    const minLength = 3;
    const maxLength = 10;
    return formData.name.length >= minLength && formData.name.length <= maxLength;
  }

  const handleClick = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (isNameValid()) {
      await fetch('https://letter-finder-api.fly.dev/leaderboard', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("POST to leaderboard broken");
        }
        return response.json();
      })
      .then(data => {
        setLeaderboardResponse(data);
        if (data.success) {
          setGameData("init");
          setGoalIndicators(["🟡", "🟡", "🟡"]);
          setFormData({
            name: "",
            score: score,
            gameName: gameName,
          });
          closeModal();
        }
      })
      .catch(error => {
        console.error("Error happened", error);
      });
      console.log("Form Data:", formData);
    } else {
      alert("Name must be between 3 and 10 characters");
    }
  };

  // Close modal when pressing escape
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") { closeModal(); };
    };
    document.addEventListener("keydown", handleKeydown);
  });

  return (
    <div className="overlay" style={{display: hide}}>
      <div className="game_win_modal" style={{display: hide}}>
        <span className="modal-x-button" onClick={closeModal}>&times;</span>
        <h1 style={{color: "gold", marginTop: "18px"}}>You won!</h1>
        <p>Add your name to the leaderboard!</p>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <div style={{marginTop: "10px", fontSize: "12px"}}>3 to 10 characters</div>
        <button style={{backgroundColor: "gold", color: "black", marginTop: "18px"}} onClick={handleClick}>Submit</button>
      </div>
    </div>
  )
};

export default GameWinModal;
