import './App.css';
import { Footer } from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { useDebounce } from '../../utils/utils';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalogPage/CatalogPage';
import { PostPage } from '../../pages/postPage/PostPage';
import { Page404 } from '../../pages/page404/Page404';
import { Favourites } from '../../pages/favorites/Favorites';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../storage/userSlice/userSlice';
import { currentTags, fetchCards, searchByTag } from '../../storage/cardsSlice/cardsSlice';
import { fetchSearchCards } from '../../storage/cardsSlice/cardsSlice';
import { ShowNotification } from '../notification/Notification';
import { AdminPage } from '../../pages/adminPage/AdminPage';
import { ProfilePage } from '../../pages/profilePage/profilePage';
import { Authorization } from '../authorization/Authorization';
import { Modal } from '../modal/Modal';
import { ResetPass } from '../auth/resetPassword/ResetPassword';
import { Register } from '../auth/register/Register';
import { Login } from '../auth/login/Login';
import { CommentPage } from '../../pages/commentPage/CommentPage';
import { fetchAllComments } from '../../storage/allCommentsSlice/allCommentsSlice';



function App() {

  const [search, setSearch] = useState('');
  const [isAuthentificated, setIsAuthentificated] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //запрос поиска на сервер
  const handleSearch = (query) => {
    dispatch(fetchSearchCards(query));
  };

  //запрос поиска по тегу
  const handleSearchByTag = (query) => {
    dispatch(searchByTag(query));
  };

  //хук задержки поиска
  const debounceValueInApp = useDebounce(search, 500);

  //задержка запроса на поиск
  useEffect(() => {
    if (debounceValueInApp === undefined || debounceValueInApp === '') {
      dispatch(currentTags());
    } else if (debounceValueInApp.startsWith('#')) {
      const tagAsk = debounceValueInApp.slice(1);
      handleSearchByTag(tagAsk);
    } else {
      handleSearch(debounceValueInApp);
    }
  }, [debounceValueInApp]);

  //получение данных юзера а потом получение постов а потом все комментариев
  useEffect(() => {
    if (!isAuthentificated) return;
    dispatch(fetchUser()).then(() => dispatch(fetchCards()).then(() =>dispatch(fetchAllComments())));
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
      <ShowNotification />
      <header className='container'>
        <Header
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
            <Route path='admin' element={<AdminPage />}></Route>
            <Route path='comments' element={<CommentPage/>}></Route>
            <Route path='login' element={<Modal><Login/></Modal>}></Route>
            <Route path='register' element={<Modal><Register/></Modal>}></Route>
            <Route path="reset-password" element={<Modal><ResetPass /></Modal>}></Route>
          </Routes>
        </main>
        :
        <div className='not__auth container main'>Пожалуйста, авторизуйтесь
          <Authorization/>
        </div>}
      <footer className='container'>
        <Footer />
      </footer>
    </>
  );
}

export default App;
