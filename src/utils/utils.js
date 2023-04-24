import { useEffect, useState } from "react";


//склонение 'поста'
export const cast = (numb) => {
  const tempNumb = numb % 100;
  if (tempNumb > 10 && tempNumb < 20) {
    return numb + " постов";
  }
  switch (numb % 10) {
    case 1: return numb + " пост";
    case 2:
    case 3:
    case 4: return numb + " поста";
    default: return numb + " постов";
  }
}

//хук задержки отправки запроса в поисковике
export const useDebounce = (searchQuery, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(searchQuery);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(searchQuery);
    }, delay);
    return () => clearTimeout(timeout);
  }, [searchQuery]);
  return debounceValue;
};

//сортировка карточек
export const sortCards = (cards, type) => {
  switch (type) {
    case 'Популярные':
      return cards.sort((a, b) => b.likes.length - a.likes.length);
    case 'Новинки':
      return cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    case 'Непопулярные':
      return cards.sort((a, b) => a.likes.length - b.likes.length);
    case 'Старые посты':
      return cards.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    default: return cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
}

//поиск лайка
export const findLike = (posts, currentUser) =>
  posts?.likes?.some((el) => el === currentUser?._id);

//фильтрация карточек по id
export const filterCards = (dataCards) => {
  const newCards = dataCards.filter((e) => e.author._id === '63ed527759b98b038f77b67f' || e.author._id === '63ee62853aa285034f78ab18')
  return newCards;
}

//сортировка коментариев по новизне
export const sortComments = (comments) => {
  const newComments = comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  return newComments;
}

//функция количества комментариев
export const sliceComments = (data, count) => {
  const newComments = data.slice(0, count);
  return newComments;
}

//функция для пагинации постов
export const slicePosts = (data, countFrom, count) => {
  const newComments = data.slice(countFrom, count);
  return newComments;
}
