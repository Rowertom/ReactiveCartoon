import './App.css';
import { Footer } from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { api } from '../../utils/Api';
import { useDebounce } from '../../utils/utils';
import { UserContext } from '../../context/UserContext'
import { CardContext } from '../../context/CardContext'
import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalogPage/CatalogPage';
import { Page404 } from '../../pages/page404/Page404';


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

  const contextCardValue = { cards, handlePostLike, deleteOwnPost };
  const contextUserValue = { currentUser, setSarch };

  return (
    <>
      <UserContext.Provider value={contextUserValue}>
        <CardContext.Provider value={contextCardValue}>
          <header className='container'>
            <Header />
          </header>
          <main className='container'>
            <Routes>
              <Route path='/' element={<CatalogPage/>}></Route>
              <Route path='*' element={<Page404/>}></Route>
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
