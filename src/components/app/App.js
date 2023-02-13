import './App.css';
import { CardList } from '../cardList/CardList';
import { Footer } from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import Data from '../../data/data.json';
import { Header } from '../header/Header';


function App() {

  const [cards, setCards] = useState(Data);
  const [statSarch, setSarch] = useState('');

  useEffect(() => {
    if (!statSarch) {
      setCards(Data)
    }

    const newState = Data.filter((e) => (e.title.toLowerCase()).includes(statSarch));
    console.log(newState);
    setCards(newState)
  }, [statSarch]);

  function cast(numb) {
    const tempNumb = numb % 100;
    if(tempNumb > 10 && tempNumb < 20){
        return numb + " постов";
    }
    switch (numb % 10){
        case 1: return numb + " пост";
        case 2: 
        case 3:
        case 4: return numb + " поста";
        default: return numb + " постов";
    }
}

  return (
    <>
      <header className='container'>
        <Header setSarch={setSarch} />
      </header>
      <main className='container'>
        {statSarch && <p className='countPosts'>По запросу {statSarch} найдено {cast(cards.length)} смотреть в консоли</p>}
        <CardList cards={cards}/>
      </main>
      <footer className='container'>
        <Footer />
      </footer>
    </>
  );
}

export default App;
