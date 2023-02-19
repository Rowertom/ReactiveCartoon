import './style.css';

export const User =({user})=> {
return (
    <a href="/" className='user_container user__links'>
        <span>{user.name}</span>
        <span>{user.about}</span>
        <span>{user.email}</span>
    </a>
)
}