import { useEffect, useState } from 'react';

const LeaderboardModal = (props) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const gameName = props.game_name;
  const hide = props.show_leaderboard ? "block" : "none";
  const showLeaderboard = props.set_show_leaderboard;
  const uri = `https://letter-finder-api.fly.dev/leaderboard?name=${gameName}`;

  const closeModal = () => {
    showLeaderboard(false)
  };

  // Close modal when pressing escape
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") { closeModal(); };
    };
    document.addEventListener("keydown", handleKeydown);
  });

  // Grab the scores
  const grabScores = () => {
    fetch(uri)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not grab scores");
        }
        return response.json();
      })
      .then(data => {
        setLeaderboardData(data.data);
      })
      .catch(error => {
        console.error("Error:", error);
      })
  };

  // Grab scores on load
  useEffect(() => {
    grabScores();
  },[hide])

  // Put scores into a formatted array
  const displayScores = leaderboardData.map((elem) => {
    const time = new Date(elem.time);
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    const milliseconds = elem.time % 1000;

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;

    return (<tr key={elem.time}><td>{elem.name}</td><td>{formattedTime}</td></tr>);
  });

  return (
    <div style={{display: hide}}>
      <div className="overlay">
        <div className="leaderboard">
          <h1 style={{marginTop: "10px", color: "gold"}}>Leaderboard</h1>
          <span className="modal-x-button" onClick={closeModal}>&times;</span>
          <span className="refresh" onClick={grabScores}>refresh</span>
          <table className="table">
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Player Time</th>
              </tr>
            </thead>
            <tbody>
              {displayScores}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;
