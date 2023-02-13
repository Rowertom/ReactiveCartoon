import React, { useEffect, useState } from 'react';
// import { Cards } from '../Cards/Cards';
import Data from '../../Data/Data.json'
import './style.css';
import {Header} from '../Header/Header';
import { Footer } from '../Footer/Footer';


function App() {
  const [cards, setCards] = useState(Data);
  const [statSarch, setSarch] = useState('');

  useEffect(()=> {
    if(!statSarch){
      setCards(Data)
    }

const newState = Data.filter((e)=>(e.name.toLowerCase()).includes(statSarch.toLowerCase()));
setCards(newState)
  }, [statSarch]);

  return (
    <div className='App'>
      <Header setSarch={setSarch}/>
      <main className='content contain'>
  {statSarch && <p>По запросу {statSarch} найдено {cards.length} товаров</p>}

</main>
<Footer/>
    </div>
  );
}

export default App;