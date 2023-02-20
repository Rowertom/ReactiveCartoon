import './style.css'
import { Card } from '../card/Card';
import dayjs from 'dayjs/';
// import CardPagination from './pagination/Pagination';
// import { useState } from 'react';


export const CardList = ({cards, currentUser, handlePostLike, deleteOwnPost}) => {

    // const [data, setData] = useState([]);

    return (
        <div>
            <div className='cards'>
                {cards.map((item) => {
                    const date1 = dayjs(item.created_at);
                    const date2 = dayjs('2023-02-19 21:00:00');
                    if (date1.isAfter(date2)){
                        return <Card {...item}
                        posts={item}
                        key={item._id}
                        date={dayjs(item.created_at).format("DD.MM.YYYY")}
                        currentUser={currentUser}
                        handlePostLike={handlePostLike}
                        deleteOwnPost={deleteOwnPost}
                        />;
                    }
                })}
            </div>
            <div className='pagination'>
            {/* <CardPagination cards={cards} setData={(dat) => setData(dat)}/> */}
            </div>
        </div>
    );
};
