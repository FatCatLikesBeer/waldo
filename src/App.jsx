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
  new Game("nicola", puzzle1, "eyes", "eyes", "elbows", "elbows", "hair", "hair"),
  new Game("text", puzzle2, "tildea", "ã", "uppercaseT", "T", "sharpS", "ß"),
  new Game("testicle", testPuzzle, "testicle", "testicle", "boobies", "boobies", "ass", "ass"),
];

const listOfLinks = gameData.map( elem => {
  return(elem.gameName);
})

function App() {
  const [game, setGame] = useState('default'); // It might be better if I used useContext here.

  return(
    <>
      <Top game_names={listOfLinks} game_picker={setGame} />
      {gameData.map( (elem, index)=> {
        if (game === elem.gameName) {
          return( <Puzzle pic={elem.image} goalNames={elem.goalNames} key={index} /> );
        }
      })}
      <Bottom />
    </>
  )
}

export default App;
