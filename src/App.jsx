import './App.css';
import { useState } from 'react';
import Top from './components/Top';
import Bottom from './components/Bottom';
import Puzzle from './components/Puzzle';
import puzzle1 from './assets/pic1.jpg';
import puzzle2 from './assets/pic2.jpg';
import testPuzzle from './assets/react.svg';

const gameData = [
  {
    image: puzzle1,
    gameName: "woman",
    goalNames: {
      goalOne: "eyes",
      goalTwo: "elbows",
      goalThree: "hair",
    },
  },
  {
    image: puzzle2,
    gameName: "text",
    goalNames: {
      goalOne: "tildea",
      goalTwo: "uppercaseT",
      goalThree: "sharpS",
    }
  },
  {
    image: testPuzzle,
    gameName: "testicle",
    goalNames:{
      goalOne: "testicle",
      goalTwo: "boobies",
      goalThree: "ass",
    }
  }
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
      {/* <Puzzle pic={gameData[0].image} goalNames={gameData[0].goalNames} /> */}
      {/* <Puzzle pic={gameData[1].image} goalNames={gameData[1].goalNames} /> */}
      {/* <Puzzle pic={gameData[2].image} goalNames={gameData[2].goalNames} /> */}
      <Bottom />
    </>
  )
}

export default App
