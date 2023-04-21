
import './style.css';
import { useSelector } from 'react-redux';


export const Avatar =()=> {

    const currentUser = useSelector(s => s.user.data);

return (
    <img src={currentUser.avatar} alt='аватар' className='ava'/>
)}
