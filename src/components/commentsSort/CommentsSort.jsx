import { MenuItem, Select } from '@mui/material';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCountComments, sortedAllComments } from '../../storage/allCommentsSlice/allCommentsSlice';
import { useState } from 'react';


export const CommentsSort = () => {

  const { allComments, countShownComments } = useSelector(s => s.allComments);
  const dispatch = useDispatch();
  const [value, setValue] = useState('new');


  const handleChange = (event) => {
    dispatch(setCountComments(event.target.value));
  };

  const handleSort = (event) => {
    setValue(event.target.value);
    dispatch(sortedAllComments(event.target.value));
  }

  return (
    <div className='sort__comments'>
      <div className='sort__comments__count'>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={countShownComments}
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={allComments?.length}>Показать все</MenuItem>
        </Select>
      </div>
      <div className="sort__comments__data">
        <span>Сортировать по:</span>
        <div>
          <input
            type="radio"
            id="date"
            checked={value === 'new' ? true : false}
            name="По дате создания"
            value='new'
            onChange={handleSort} />
          <label htmlFor="date">По дате создания</label>
        </div>
        <div>
          <input
            type="radio"
            id="author"
            name="По автору комментария"
            checked={value === 'comment' ? true : false}
            value='comment'
            onChange={handleSort} />
          <label htmlFor="author">По автору комментария</label>
        </div>
        <div>
          <input
            type="radio"
            id="post"
            name="По посту"
            checked={value === 'post' ? true : false}
            value='post'
            onChange={handleSort} />
          <label htmlFor="post">По посту</label>
        </div>
      </div>
    </div>
  )
}