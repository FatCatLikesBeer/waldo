import './App.css';
import { useState } from 'react';
import Top from './components/Top';
import Bottom from './components/Bottom';
import Puzzle from './components/Puzzle';
import Game from './gameConstructor';

import intro from './assets/default.jpg';
import easy from './assets/easy.jpg';
import medium from './assets/medium.jpg';
import hard from './assets/hard.jpg';

const gameData = [
  // new Game("gameName", image, "APIname1", "displayName1", "APIname2", "displayName2", "APIname3", "displayName3"),
  new Game("easy", easy, "n", "n", "u", "u", "o", "o"),
  new Game("medium", medium, "n", "n", "u", "u", "o", "o"),
  new Game("hard", hard, "ã", "tildea", "T", "T", "ß", "sharpS"),
];

const listOfLinks = gameData.map( elem => {
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
  const home = new Game("intro", intro, "b", "b", "p", "p", "d", "d");
  if (props.game === home.gameName) {
    return (<Puzzle pic={home.image} goalNames={home.goalNames} gameName={home.gameName} />)
  };
};

function App() {
  const [game, setGame] = useState('intro'); // It might be better if I used useContext here.

  return(
    <>
      <Top game_names={listOfLinks} game_picker={setGame} />
      <Home game={game} />
      <PuzzleInstances game={game} />
      <Bottom />
    </>
  )
}

export default App;
