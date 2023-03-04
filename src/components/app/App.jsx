import './App.css';
import { CardList } from '../cardList/CardList';
import { Footer } from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { api } from '../../utils/Api';
import { cast, useDebounce } from '../../utils/utils';


function App() {

  const [cards, setCards] = useState([]);
  const [statSarch, setSarch] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  const handleSearch = (search) => {
    api.searchPosts(search).then((data) => setCards([...data]));
  };

  const debounceValueInApp = useDebounce(statSarch, 500);

  useEffect(() => {
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  useEffect(() => {
    api.getAllPosts().then(posts => setCards(posts));
  }, []);

  useEffect(() => {
    api.getUserInfo().then(userData => setCurrentUser(userData));
  }, [])

  function handlePostLike(posts) {
    const isLiked = posts.likes.some(id => id === currentUser._id);
    api.changeLikePostStatus(posts._id, isLiked).then((newCard) => {
      const newCards = cards.map((e) => e._id === newCard._id ? newCard : e);
      setCards([...newCards]);
    });
  }

  function deleteOwnPost(posts) {
    if (posts.author._id === currentUser._id && window.confirm('Are you sure?')) {
      api.deletePost(posts._id).then((post) => {
        const newPosts = cards.filter((el) => el._id !== posts._id);
        setCards([...newPosts]);
      });
    } else if (posts.author._id !== currentUser._id) {
      window.alert("You can't delete this post");
    }
  }

  useEffect(() => {
    api.getUserInfo().then((userData) => {
      setCurrentUser(userData)
    })
  }, []);

  return (
    <>
      <header className='container'>
        <Header setSarch={setSarch} user={currentUser} />
      </header>
      <main className='container'>
        {statSarch && <p className='countPosts'>По запросу {statSarch} найдено {cast(cards.length)} </p>}
        <CardList cards={cards} currentUser={currentUser} handlePostLike={handlePostLike} deleteOwnPost={deleteOwnPost} />
      </main>
      <footer className='container'>
        <Footer />
      </footer>
    </>
  );
}

export default App;
