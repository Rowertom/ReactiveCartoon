import './App.css';
import { Footer } from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { api } from '../../utils/Api';
import { sortCards, useDebounce } from '../../utils/utils';
import { UserContext } from '../../context/UserContext'
import { CardContext } from '../../context/CardContext'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalogPage/CatalogPage';
import { PostPage } from '../../pages/postPage/PostPage';
import { Page404 } from '../../pages/page404/Page404';
import { Modal } from '../modal/Modal';
import { Login } from '../auth/login/Login';
import { Register } from '../auth/register/Register';
import { ResetPass } from '../auth/resetPassword/ResetPassword';
import { Profile } from '../profile/Profile';
import { Favourites } from '../../pages/favorites/Favorites';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../storage/userSlice/userSlice';
import { fetchCards } from '../../storage/cardsSlice/cardsSlice';



function App() {

  const [cardss, setCards] = useState([]);
  const [statSarch, setSarch] = useState('');
  const [isAuthentificated, setIsAuthentificated] = useState(false)
  const [activeModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const cards = useSelector(s => s.cards.posts);


  const handleSearch = (search) => {
    api.searchPosts(search).then((data) => setCards(data));
  };

  const debounceValueInApp = useDebounce(statSarch, 500);

  useEffect(() => {
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

useEffect(() =>{
  if (!isAuthentificated) return;
  dispatch(fetchUser()).then(() => dispatch(fetchCards()));
}, [isAuthentificated, dispatch]);

  useEffect(() => {
    setCards(cards);
  },[cards])

  function setSortCards(sort) {
    const cardSorted = sortCards(cards, sort);
    setCards([...cardSorted]);
  }

  const contextCardValue = {
    cards,
  };

  const contextUserValue = {
    setSarch,
    setSortCards,
    statSarch,
    isAuthentificated,
    setIsAuthentificated,
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthentificated(true)
    }
  }, [navigate]);

  return (
    <>
      <UserContext.Provider value={contextUserValue}>
        <CardContext.Provider value={contextCardValue}>
          <header className='container'>
            <Header setShowModal={setShowModal} />
          </header>
          {isAuthentificated ?
            <main className='container main'>
              <Routes>
                <Route path='/' element={<CatalogPage />}></Route>
                <Route path='/post/:postId' element={<PostPage />}></Route>
                <Route path="favourites" element={<Favourites />}></Route>
                <Route path='profile' element={<Profile />}></Route>
                <Route path='*' element={<Page404 />}></Route>
                <Route path='/login' element={<Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <Login setShowModal={setShowModal} />
                </Modal>
                }
                ></Route>
                <Route path='/register' element={<Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <Register setShowModal={setShowModal} />
                </Modal>
                }
                ></Route>
                <Route
                  path="reset-password"
                  element={
                    <Modal activeModal={activeModal} setShowModal={setShowModal}>
                      <ResetPass setShowModal={setShowModal} />
                    </Modal>
                  }>
                </Route>
              </Routes>
            </main>
            :
            <div className='not__auth container main'>Пожалуйста, авторизуйтесь
              <Routes>
                <Route path='/login' element={<Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <Login setShowModal={setShowModal} />
                </Modal>
                }
                ></Route>
                <Route path='/register' element={<Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <Register setShowModal={setShowModal} />
                </Modal>
                }
                ></Route>
                <Route
                  path="reset-password"
                  element={
                    <Modal activeModal={activeModal} setShowModal={setShowModal}>
                      <ResetPass setShowModal={setShowModal} />
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
