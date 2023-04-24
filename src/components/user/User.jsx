import './style.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export const User = () => {

    const navigate = useNavigate();
    const currentUser = useSelector(s => s.user.data);

    const handleProfile = () => {
        navigate('/profile')
    }

    return (
        <Link to={'/profile'} className='user_container user__links' onClick={handleProfile}>
            <span>{currentUser.name}</span>
        </Link>
    )
}