import './App.css';
import { Footer } from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { useDebounce } from '../../utils/utils';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalogPage/CatalogPage';
import { PostPage } from '../../pages/postPage/PostPage';
import { Page404 } from '../../pages/page404/Page404';
import { Modal } from '../modal/Modal';
import { Login } from '../auth/login/Login';
import { Register } from '../auth/register/Register';
import { ResetPass } from '../auth/resetPassword/ResetPassword';
import { Favourites } from '../../pages/favorites/Favorites';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../storage/userSlice/userSlice';
import { fetchCards } from '../../storage/cardsSlice/cardsSlice';
import { fetchSearchCards } from '../../storage/cardsSlice/cardsSlice';
import { ShowNotification } from '../notification/Notification';
import { AdminPage } from '../../pages/adminPage/AdminPage';
import { ProfilePage } from '../../pages/profilePage/profilePage';



function App() {

  const [search, setSearch] = useState('');
  const [isAuthentificated, setIsAuthentificated] = useState(false)
  const [activeModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //запрос поиска на сервер
  const handleSearch = (query) => {
    dispatch(fetchSearchCards(query));
  };

  //хук задержки поиска
  const debounceValueInApp = useDebounce(search, 500);

  //задержка запроса на поиск
  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  //получение данных юзера а потом получение постов
  useEffect(() => {
    if (!isAuthentificated) return;
    dispatch(fetchUser()).then(() => dispatch(fetchCards()));
  }, [isAuthentificated, dispatch]);

  //подтверждение аутентификации
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthentificated(true)
    }
  }, [navigate]);

  return (
    <>
    <ShowNotification/>
      <header className='container'>
        <Header
          setShowModal={setShowModal}
          isAuthentificated={isAuthentificated}
          setIsAuthentificated={setIsAuthentificated}
          setSearch={setSearch}
        />
      </header>
      {isAuthentificated ?
        <main className='container main'>

          <Routes>
            <Route path='/' element={<CatalogPage search={search} />}></Route>
            <Route path='post/:postId' element={<PostPage />}></Route>
            <Route path="favourites" element={<Favourites />}></Route>
            <Route path='profile' element={<ProfilePage />}></Route>
            <Route path='*' element={<Page404 />}></Route>
            <Route path='admin' element={<AdminPage/>}></Route>
            <Route path='/login' element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <Login setShowModal={setShowModal} />
              </Modal>
            }
            ></Route>
            <Route path='/register' element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
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
              }
            ></Route>
          </Routes>
        </main>
        :
        <div className='not__auth container main'>Пожалуйста, авторизуйтесь
          <Routes>
            <Route path='/login' element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <Login setShowModal={setShowModal} />
              </Modal>
            }
            ></Route>
            <Route path='/register' element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <Register setShowModal={setShowModal} />
              </Modal>
            }
            ></Route>
            <Route path="reset-password" element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <ResetPass setShowModal={setShowModal} />
              </Modal>
            }
            ></Route>
          </Routes>
        </div>}
      <footer className='container'>
        <Footer />
      </footer>
    </>
  );
}

export default App;
