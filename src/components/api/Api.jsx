// /ПРО ПОСТЫ
// GET https://api.react-learning.ru/v2/:groupId/posts // получение всех постов
// GET https://api.react-learning.ru/v2/:groupId/posts/search/?query=<строка фильтрации по title> // для поиска постов
// GET https://api.react-learning.ru/v2/:groupId/posts/:id // получение поста по id

// GET https://api.react-learning.ru/v2/:groupId/posts/paginate?page=<номер страницы>&limit=<число ограничивающее вывод на страницу>&query=<строка фильтрации по title> //добавление навигации

// POST https://api.react-learning.ru/v2/:groupId/posts // создание нового поста
// PATCH https://api.react-learning.ru/v2/:groupId/posts/:postId //редактирование поста по id
// DELETE https://api.react-learning.ru/v2/:groupId/posts/:postId //удаление поста по id
// PUT https://api.react-learning.ru/v2/:groupId/posts/likes/:postId // установка лайка по id
// DELETE https://api.react-learning.ru/v2/:groupId/posts/likes/:postId // снятие лайка по id
// POST https://api.react-learning.ru/v2/:groupId/posts/comments/:postId // добавление комментария по id
// DELETE https://api.react-learning.ru/v2/:groupId/posts/comments/:postId/:commentId // удаление комментария по id
// GET https://api.react-learning.ru/v2/:groupId/posts/comments/ // получение всех комментариев
// GET https://api.react-learning.ru/v2/:groupId/posts/comments/:postId // получение комментариев конкрентного поста.


// //ПРО ПОЛЬЗОВАТЕЛЯ
// GET https://api.react-learning.ru/v2/:groupId/users //получение всех пользователей
// GET https://api.react-learning.ru/v2/:groupId/users/me // получение информации о пользователе по токену в заголовках
// GET https://api.react-learning.ru/v2/:groupId/users/:userId // получение информации о пользователе по его id
// PATCH https://api.react-learning.ru/v2/:groupId/users/me // изменение name и about
// PATCH https://api.react-learning.ru/v2/:groupId/users/me/avatar // изменение avatar 

// //ПРО РЕГИСТРАЦИЮ
// POST https://api.react-learning.ru/signup // регистрация
// POST https://api.react-learning.ru/signin // авторизация
// POST https://api.react-learning.ru/password-reset // сброс пароля на почту
// POST https://api.react-learning.ru/password-reset/:userId/:token // смена пароля после подтвержения токеном