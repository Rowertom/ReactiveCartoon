import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './style.css';

export const User =()=> {

    const { currentUser } = useContext(UserContext);

return (
    <a href="/" className='user_container user__links'>
        <span>{currentUser.name}</span>
        {/* <span>{currentUser.about}</span>
        <span>{currentUser.email}</span> */}
    </a>
)
}