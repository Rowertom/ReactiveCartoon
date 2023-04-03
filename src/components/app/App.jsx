import './App.css';
import { Footer } from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { api } from '../../utils/Api';
import { findLike, sortCards, useDebounce } from '../../utils/utils';
import { UserContext } from '../../context/UserContext'
import { CardContext } from '../../context/CardContext'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalogPage/CatalogPage';
import { PostPage } from '../../pages/postPage/PostPage';
import { Page404 } from '../../pages/page404/Page404';
import { Modal } from '../modal/Modal';
import { Login } from '../auth/login/Login';
import { Register } from '../auth/register/Register';
import { ResetPass } from '../auth/resetPassword/ResetPassword';
import { Profile } from '../profile/Profile';
import { Favorites } from '../../pages/favorites/Favorites';


function App() {

  const [cards, setCards] = useState([]);
  const [statSarch, setSarch] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isAuthentificated, setIsAuthentificated] = useState(false)
  const [activeModal, setShowModal] =  useState(false) 

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
  }, [isAuthentificated]);

  useEffect(() => {
    api.getUserInfo().then(userData => setCurrentUser(userData));
  }, [isAuthentificated]);

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

  const contextCardValue = { 
    cards, 
    handlePostLike, 
    deleteOwnPost,
    favorites,
   };

  const contextUserValue = { 
    currentUser, 
    setSarch, 
    setSortCards,
    statSarch, 
    isAuthentificated, 
    setCurrentUser, 
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
    setIsAuthentificated(true)
  } 
  },[navigate]);

  return (
    <>
      <UserContext.Provider value={contextUserValue}>
        <CardContext.Provider value={contextCardValue}>
          <header className='container'>
            <Header setShowModal={setShowModal}/>
          </header>
          {isAuthentificated ?
          <main className='container'>  
            <Routes>
              <Route path='/' element={<CatalogPage/>}></Route>
              <Route path='/post/:postId' element={<PostPage/>}></Route>
              <Route path="favorites" element={<Favorites/>}></Route>
              <Route path='profile' element={<Profile/>}></Route>
              <Route path='*' element={<Page404 />}></Route>
              <Route path='/login' element={ <Modal activeModal={activeModal} setShowModal={setShowModal}>
              <Login setShowModal={setShowModal}/>
                </Modal>
                }
                ></Route>
              <Route path='/register' element={ <Modal activeModal={activeModal} setShowModal={setShowModal}>
              <Register setShowModal={setShowModal}/>
                </Modal>
                }
                ></Route>
                <Route 
              path="reset-password" 
              element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <ResetPass setShowModal={setShowModal}/>
                </Modal>
              }>
                </Route>
          </Routes>
          </main>
          : 
          <div className='not__auth'>Пожалуйста, авторизуйтесь
          <Routes>
          <Route path='/login' element={ <Modal activeModal={activeModal} setShowModal={setShowModal}>
              <Login setShowModal={setShowModal}/>
                </Modal>
                }
                ></Route>
              <Route path='/register' element={ <Modal activeModal={activeModal} setShowModal={setShowModal}>
              <Register setShowModal={setShowModal}/>
                </Modal>
                }
                ></Route>
                <Route 
              path="reset-password" 
              element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <ResetPass setShowModal={setShowModal}/>
                </Modal>
              }>
                </Route>
          </Routes>
          </div>}
          <footer className='container'>
            <Footer />
          </footer>
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
