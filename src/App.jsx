import './App.css';
import { useState } from 'react';
import Top from './components/Top';
import Bottom from './components/Bottom';
import Puzzle from './components/Puzzle';
import puzzle1 from './assets/pic1.jpg';
import puzzle2 from './assets/pic2.jpg';
import testPuzzle from './assets/react.svg';
import Game from './gameConstructor';

const gameData = [
  // new Game("gameName", image, "APIname1", "displayName1", "APIname2", "displayName2", "APIname3", "displayName3"),
  new Game("nicola", puzzle1, "Eyes", "eyes", "Elbows", "elbows", "Hair", "hair"),
  new Game("text", puzzle2, "ã", "tildea", "T", "uppercaseT", "ß", "sharpS",),
  new Game("testicle", testPuzzle, "testicle", "testicle", "boobies", "boobies", "ass", "ass"),
];

const listOfLinks = gameData.map( elem => {
  return(elem.gameName);
})

const PuzzleInstances = (props) => {
  const game = props.game
  return(gameData.map( (elem, index) => {
    if (game === elem.gameName) {
      return( <Puzzle pic={elem.image} goalNames={elem.goalNames} key={index} /> )
    }
  }))
}

function App() {
  const [game, setGame] = useState('default'); // It might be better if I used useContext here.

  return(
    <>
      <Top game_names={listOfLinks} game_picker={setGame} />
      <PuzzleInstances game={game} />
      <Bottom />
    </>
  )
}

export default App;
