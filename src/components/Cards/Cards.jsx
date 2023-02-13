import {Card} from '../Card/Card'
import './style.css'

export const Cards =({cards})=>{
    return (
<div className='cards'>
    {cards.map((item)=> {
        return <Card {...item} key= {item.name} />
})}
</div>
    );
}