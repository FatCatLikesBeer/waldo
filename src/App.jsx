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
  new Game("woman", puzzle1, "eyes", "elbows", "hair"),
  new Game("text", puzzle2, "tildea", "uppercaseT", "sharpS"),
  new Game("testicle", testPuzzle, "testicle", "boobies", "ass"),
];

const listOfLinks = gameData.map( elem => {
  return(elem.gameName);
})

function App() {
  const [game, setGame] = useState('default');

  return(
    <>
      <Top game_names={listOfLinks} game_picker={setGame} />
      {gameData.map( (elem, index)=> {
        if (game === elem.gameName) {
          return(
            <Puzzle pic={elem.image} goalNames={elem.goalNames} key={index} />
          );
        }
      })}
      <Bottom />
    </>
  )
}

export default App
