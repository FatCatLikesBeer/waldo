import { useState } from 'react';

export default function Top(props) {

  const links = ["Text", "Waldo", "Coins"];
  const gameNames = props.game_names;
  const setGame = props.game_picker;
  const gameData = [];

  gameNames.forEach( elem => {
    gameData.push({
      gameName: elem,
      setGame: function(){setGame(elem)},
    });
  });

  const goHome = () => {
    setGame("intro");
  };

  return(
    <div id="navbar">
      <h1 id="navtitle"><span onClick={goHome}>Letter Finder</span></h1>
      <h3 id="subtitle">Where's Waldo but with text :)</h3>
      <div id="navlinksdiv">
        <ul id="navlinks">
          {gameData.map( (elem, index)=> {
            return (<li key={index}><span onClick={elem.setGame}>{String(elem.gameName[0].toUpperCase() + elem.gameName.slice(1))}</span></li>)
          })}
        </ul>
      </div>
    </div>
  );
};
