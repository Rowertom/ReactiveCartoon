import { useEffect, useState } from "react";

export const cast = (numb) => {
    const tempNumb = numb % 100;
    if(tempNumb > 10 && tempNumb < 20){
        return numb + " товаров";
    }
    switch (numb % 10){
        case 1: return numb + " товар";
        case 2: 
        case 3:
        case 4: return numb + " товара";
        default: return numb + " товаров";
    }
}

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

  export const sortCards = (cards, type) => {
  switch (type) {
    case 'Популярные':
      return cards.sort((a, b) => b.likes.length - a.likes.length);
    case 'Новинки':
      return cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    default: return cards;

  }
}