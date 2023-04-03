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

export const Header = ({setShowModal}) => {

    const handleAddContent = () => {
        console.log('Есть контакт')
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const {isAuthentificated}= useContext(UserContext);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

   const navigate= useNavigate()

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
        handleClose()
    }

    const handleProfile=()=>{
    navigate('/profile')
    handleClose()
    }

const handleFavorit =()=>{
    navigate('/favorites')
    handleClose()
    }

    return (
        <>
        <div className='header'>
            <div className='contain'>
                <div className='header__wrap'>
                    <div className='header__left'>
                        <Logo />
                        <Search />
                        <button className='btn_header' onClick={handleAddContent}>СОЗДАТЬ ПОСТ</button>
                    </div>
                   {!isAuthentificated ? <Link to={"/login"} className="header_link" onClick={()=>setShowModal(true)}>
                        <Login/>
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
        </div>
        </>
    );
    }