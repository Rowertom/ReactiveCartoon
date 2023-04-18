import { Search } from '../search/Search';
import { Logo } from '../logo/Logo';
import { Avatar } from '../avatar/Avatar';
import { User } from '../user/User';
import './style.css';
import { UserContext } from '../../context/UserContext'
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Login } from '../../assets/images/loginh.svg';
import { useContext } from "react";
import { Modal } from '../modal/Modal';
import { CreatePost } from '../createPost/CreatPost';

export const Header = ({ setShowModal }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [createPostModal, setCreatePostModal] = React.useState(false);

    const { isAuthentificated, setIsAuthentificated } = useContext(UserContext);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
        setIsAuthentificated(false);
        handleClose()
    }

    const handleProfile = () => {
        navigate('/profile')
        handleClose()
    }

    const handleFavorit = () => {
        navigate('/favourites')
        handleClose()
    }

    return (
        <>
            <div className='header'>
                <div className='header__wrap'>
                    <div className='header__left'>
                        <Logo />
                        <Search />
                        <div>
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