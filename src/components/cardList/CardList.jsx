import './style.css'
import { Card } from '../card/Card';
import dayjs from 'dayjs/';


export const CardList = ({ cards }) => {

    return (
        <div>
            <div className='cards'>
                {cards.map((item) => {
                    return <Card {...item}
                        posts={item}
                        key={item._id}
                        date={dayjs(item.created_at).format("DD.MM.YYYY")}
                    />;
                })}
            </div>
        </div>
    );
};
