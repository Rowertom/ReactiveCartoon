import { ReactComponent as Like } from './like.svg'
import './style.css'

export const Card = ({name, picture, discount, price, wight})=> {
    return (
        <div className='card'>
            <div className='card__sticky card__sticky_type_top-left'>
                <span className='card__discount'>{discount}%</span>
                </div>
            <div className='card__sticky card__sticky_type_top-right'>
                <button className='card__favorite'>
                <Like className='card__liked'/>
                </button>
                </div>
<a href="/" className='card__link'>
    <img src= {picture} alt="" className='card__image'/>
    <div className="card__desc">
        <span className='card__price'>{price}р</span>
        <span className='card__wight'>{wight}</span>
        <p className='card__name'>{name}</p>
    </div>
</a>
<a href="/" className='card__cart btn btn_type_primary' >В корзину</a>
        </div>
    )
}