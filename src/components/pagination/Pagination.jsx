import Pagination from '@mui/material/Pagination';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../storage/cardsSlice/cardsSlice';
import * as React from 'react';


export const Paginate = () => {

    const dispatch = useDispatch();

    const { total, pageSize } = useSelector(s => s.cards)

    function handlePageChange(event, page) {
        dispatch(setPage(page));
        window.scrollTo(0, 0);
    }

    return (
        <div className='pagination'>
            <Pagination
                color="primary"
                variant="text"
                count={Math.ceil(total / pageSize)}
                onChange={handlePageChange}
                size={'large'}
            />
        </div>
    );
};