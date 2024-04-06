import Top from '../components/Header';
import './App.css';
import pic from './assets/pic1.jpg';
import { useState } from 'react';

// Thanks to PaunescuDragos-99 / waldo-game-frontend
const Pic = () => {
  const [coords, setCoords] = useState([0, 0]);

  const handleClick = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setCoords([x, y]);
    console.log(elem);
    console.log(`Top: ${top}\nLeft: ${left}`);
    console.log(`x: ${x}\ny: ${y}`);
  };

  return(
    <>
      <p>X: {coords[0]}</p>
      <p>Y: {coords[1]}</p>
      <img className="puzzle" onClick={handleClick} src={pic} />
    </>
  )
}

function App() {
  return(
    <>
      <Top />
      <Pic />
    </>
  )
}

export default App
