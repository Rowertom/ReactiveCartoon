import { Search } from '../search/Search';
import { Logo } from '../logo/Logo';
import { Avatar } from '../avatar/Avatar';
import { User } from '../user/User';
import './style.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Login } from '../../assets/images/loginh.svg';
import { Modal } from '../modal/Modal';
import { CreatePost } from '../createPost/CreatPost';

export const Header = ({
    setShowModal,
    isAuthentificated,
    setIsAuthentificated,
    setSearch
}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [createPostModal, setCreatePostModal] = React.useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate()

    //выйти из профиля
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
        setIsAuthentificated(false);
        handleClose()
    }

    //переход в профайл
    const handleProfile = () => {
        navigate('/profile')
        handleClose()
    }

    //переход в избранное
    const handleFavorit = () => {
        navigate('/favourites')
        handleClose()
    }

    //переход на страницу админа
    const handleAdmin = ()=>{
        navigate('/admin')
        handleClose()
       }

    return (
        <>
            <div className='header'>
                <div className='header__wrap'>
                    <div className='header__left'>
                        <Logo />
                        <Search setSearch={setSearch} />
                        <div className='header__create'>
                            <button className='btn_header' onClick={() => setCreatePostModal(true)}>СОЗДАТЬ ПОСТ</button>
                            {createPostModal && <Modal activeModal={createPostModal} setShowModal={setCreatePostModal}>
                                <CreatePost setCreatePostModal={setCreatePostModal} />
                            </Modal>}
                        </div>
                    </div>
                    {!isAuthentificated ? <Link to={"/login"} className="header_link" onClick={() => setShowModal(true)}>
                        <Login />
                    </Link> :
                        <div className='header__rait'>
                            <User />
                            <Box sx={{ flexGrow: 1 }}>
                                <div>
                                    <IconButton className='ava'
                                        alt='аватар'
                                        onClick={handleMenu}
                                    >
                                        <Avatar />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleProfile}>Профиль</MenuItem>
                                        <MenuItem onClick={handleAdmin}>Статистика</MenuItem>
                                        <MenuItem onClick={handleFavorit}>Избранное</MenuItem>
                                        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                                    </Menu>
                                </div>
                            </Box>
                        </div>}
                </div>
            </div>
        </>
    );
}