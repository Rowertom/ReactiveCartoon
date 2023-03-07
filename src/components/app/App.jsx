import './App.css';
import { Footer } from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { api } from '../../utils/Api';
import { sortCards, useDebounce } from '../../utils/utils';
import { UserContext } from '../../context/UserContext'
import { CardContext } from '../../context/CardContext'
import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalogPage/CatalogPage';
import { Page404 } from '../../pages/page404/Page404';


function App() {

  const [cards, setCards] = useState([]);
  const [statSarch, setSarch] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  // const [favorites, setFavorites] = useState([]);

  const filterCards = (dataCards) => {
    return dataCards.filter((e) => e.author._id === '63ed527759b98b038f77b67f' || e.author._id === '63ee62853aa285034f78ab18')
  }

  const handleSearch = (search) => {
    api.searchPosts(search).then((data) => setCards(filterCards(data)));
  };

  const debounceValueInApp = useDebounce(statSarch, 500);

  useEffect(() => {
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  useEffect(() => {
    api.getAllPosts().then(posts => setCards(filterCards(posts)));
  }, []);

  useEffect(() => {
    api.getUserInfo().then(userData => setCurrentUser(userData));
  }, []);

  function handlePostLike(posts) {
    const isLiked = posts.likes.some(id => id === currentUser._id);
    api.changeLikePostStatus(posts._id, isLiked).then((newCard) => {
      const newCards = cards.map((e) => e._id === newCard._id ? newCard : e);
      setCards([...newCards]);
    });
  }

  function deleteOwnPost(posts) {
    if (posts.author._id === currentUser._id && window.confirm('Are you sure?')) {
      api.deletePost(posts._id).then(() => {
        const newPosts = cards.filter((el) => el._id !== posts._id);
        setCards([...newPosts]);
      });
    } else if (posts.author._id !== currentUser._id) {
      window.alert("You can't delete this post");
    }
  }

  function setSortCards(sort) {
    const cardSorted = sortCards(cards, sort);
    setCards([...cardSorted]);
  }

  const contextCardValue = { cards, handlePostLike, deleteOwnPost };
  const contextUserValue = { currentUser, setSarch, setSortCards, statSarch };

  return (
    <>
      <UserContext.Provider value={contextUserValue}>
        <CardContext.Provider value={contextCardValue}>
          <header className='container'>
            <Header />
          </header>
          <main className='container'>
            <Routes>
              <Route path='/' element={<CatalogPage />}></Route>
              <Route path='*' element={<Page404 />}></Route>
            </Routes>
          </main>
          <footer className='container'>
            <Footer />
          </footer>
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
