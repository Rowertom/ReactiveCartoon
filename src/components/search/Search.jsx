import './style.css'

export const Search = ({setSarch})=>{
    return (
    <input placeholder='Поиск' 
    onChange={(e)=>setSarch(e.target.value)} 
    className="search__input"/>
    )
}