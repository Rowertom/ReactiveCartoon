import { useDispatch } from 'react-redux';
import './style.scss'
import { sortedCards } from "../../storage/cardsSlice/cardsSlice";


export const Sort = () => {

    const dispatch = useDispatch();

    const sortedItems = [
        {id: 'Новинки'},
        {id: 'Популярные'},
        {id: 'Непопулярные'},
        {id: 'Старые посты'},
    ];

    //вызываем action сортировки карточек
    const setSortCards = (id) => {
        dispatch(sortedCards(id));
    }

    return (
        <div className="sort__cards">
            {sortedItems.map((e) =>
                <button key={e.id} className='sort__cards__item' onClick={() => setSortCards(e.id)}>{e.id}</button>
            )}
        </div>
    );
}