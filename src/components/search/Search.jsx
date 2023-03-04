import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import './style.css'

export const Search = ()=>{

const {setSarch} = useContext(UserContext);

    return (
    <input placeholder='Поиск' 
    onChange={(e)=>setSarch(e.target.value)} 
    className="search__input"/>
    )
}