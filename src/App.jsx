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
  // new Game("gameName", image, "displayName1", "APIname1", "displayName2", "APIname2", "displayName3", "APIname3"),
  new Game("easy", easy, "n", "first", "u", "second", "o", "third"),
  new Game("medium", medium, "n", "first", "u", "second", "o", "third"),
  new Game("hard", hard, "ã", "first", "T", "second", "ß", "third"),
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
  const home = new Game("intro", intro, "b", "first", "p", "second", "d", "third");
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
