
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './style.css';


export const Avatar =()=> {

    const { currentUser } = useContext(UserContext);

return (
    <img src={currentUser.avatar} alt='аватар' className='ava'/>
)}
