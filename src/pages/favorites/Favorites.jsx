import { useNavigate } from "react-router-dom"
import { CardList } from "../../components/cardList/CardList"
import './style.css'
import { useSelector } from "react-redux"

export const Favourites =()=>{
    const navigate = useNavigate();
    const favourites = useSelector(s => s.cards.favourites);
    
    return (
        <>
        <button className='post_btn btn__type__primary' onClick={()=>navigate(-1)}>{'< '}Назад</button>
        <div className="favorites">
            <h1>Избранное</h1>
            {!!favourites.length ?
            <CardList cards={favourites}/>
            : <div className="no_found">У вас нет избраных товаров.</div>}
        </div>
        </>
    )
}