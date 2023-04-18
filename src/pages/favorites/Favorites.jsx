import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CardList } from "../../components/cardList/CardList"
import { CardContext } from "../../context/CardContext"
import './style.css'

export const Favourites =()=>{
    const {favourites}= useContext(CardContext)
    const navigate = useNavigate()
    
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