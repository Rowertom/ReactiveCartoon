import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import './style.scss'


export const Sort = () => {

    const {setSortCards} = useContext(UserContext);
    const sortedItems = [
        {id: 'Новинки'},
        {id: 'Популярные'},
    ];

    return (
        <div className="sort__cards">
            {sortedItems.map((e) =>
                <button key={e.id} className='sort__cards__item' onClick={() => setSortCards(e.id)}>{e.id}</button>
            )}
        </div>
    );
}