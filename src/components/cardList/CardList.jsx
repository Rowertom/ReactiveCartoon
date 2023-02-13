import './style.css'
import { Card } from '../card/Card';
import dayjs from 'dayjs/';
import CardPagination from './pagination/Pagination';
import { useState } from 'react';


export const CardList = () => {

    let now = dayjs();
    const [data, setData] = useState([]);

    return (
        <div>
            <div className='cards'>
                {data.map((item) => {
                    return <Card {...item}
                        key={item._id}
                        date={now.format("DD.MM.YYYY")}
                    />;
                })}
            </div>
            <div className='pagination'>
            <CardPagination setData={(dat) => setData(dat)}/>
            </div>
        </div>
    );
};

// export const CardList = () => {
//     return (
//         <div className='cards'>
//         <Card/>
//         </div>
//     );
// };