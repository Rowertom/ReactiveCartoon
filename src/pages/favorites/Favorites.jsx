import { useContext } from "react"
import { useNavigate } from "react-router-dom"
// import { Cards } from "../../components/cardList/CardList"
import { CardContext } from "../../context/CardContext"
import './style.css'

export const Favorites =()=>{
    const {favorites}= useContext(CardContext)
    const navigate = useNavigate()
    
    return (
        <>
        <button className='post_btn btn__type__primary' onClick={()=>navigate(-1)}>{'< '}Назад</button>
        <div className="favorites">
            <h1>Избранное</h1>
            {/* {!!favorites.length ?
            <Cards cards={favorites}/>
            : <div className="no_found">У вас нет избраных товаров.</div>} */}
        </div>
        </>
    )
}