import './App.css';
import { useState } from 'react';
import Top from './components/Top';
import Bottom from './components/Bottom';
import Puzzle from './components/Puzzle';
import Game from './gameConstructor';

import introImage from './assets/default.jpg';
import easyImage from './assets/easy.jpg';
import mediumImage from './assets/medium.jpg';
import hardImage from './assets/hard.jpg';

const gameData = [
  // new Game("gameName", image, "displayName1", "APIname1", "displayName2", "APIname2", "displayName3", "APIname3"),
  new Game("easy", easyImage, "n", "first", "u", "second", "o", "third"),
  new Game("medium", mediumImage, "n", "first", "u", "second", "o", "third"),
  new Game("hard", hardImage, "ã", "first", "T", "second", "ß", "third"),
];

const arrayOfGameNamesForSiteHeader = gameData.map( elem => {
  return(elem.gameName);
});

const PuzzleInstances = (props) => {
  const game = props.game
  return(gameData.map( (elem, index) => {
    if (game === elem.gameName) {
      return( <Puzzle pic={elem.image} goalNames={elem.goalNames} key={index} gameName={elem.gameName} /> )
    }
  }))
};

const Home = (props) => {
  const home = new Game("intro", introImage, "b", "first", "p", "second", "d", "third");
  if (props.game === home.gameName) {
    return (<Puzzle pic={home.image} goalNames={home.goalNames} gameName={home.gameName} />)
  };
};

function App() {
  const [game, setGame] = useState('intro'); // It might be better if I used useContext here.

  return(
    <>
      <Top game_names={arrayOfGameNamesForSiteHeader} game_picker={setGame} />
      <Home game={game} />
      <PuzzleInstances game={game} />
      <Bottom />
    </>
  )
}

export default App;
