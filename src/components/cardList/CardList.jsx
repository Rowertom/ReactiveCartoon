import './style.css'
import { Card } from '../card/Card';


// export const CardList = ({cards}) => {
//     return (
//         <div className='cards'>
//             {cards.map((item, i) => {
//                return     <Card key={i}
//                             picture={item.picture}
//                             name={item.name}
//                             discount={item.discount}
//                             price={item.price}
//                     />;
//             })}
//         </div>
//     );
// };

export const CardList = () => {
    return (
        <div className='cards'>
        <Card/>
        </div>
    );
};