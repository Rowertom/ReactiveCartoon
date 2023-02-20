import './App.css';
import { CardList } from '../cardList/CardList';
import { Footer } from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import Data from '../../data/data.json';
import { Header } from '../header/Header';
import { api } from '../api/Api.jsx';


function App() {

  const [cards, setCards] = useState(Data);
  const [statSarch, setSarch] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (!statSarch) {
      setCards(Data)
    }

    const newState = Data.filter((e) => (e.title.toLowerCase()).includes(statSarch));
    console.log(newState);
    setCards(newState)
  }, [statSarch]);

  useEffect(()=>{
    Promise.all([api.getUsersInfo()])
    .then(([userData])=>{
    setCurrentUser(userData)
  })
  }, []);


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
        <Header setSarch={setSarch} user= {currentUser}/>
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
