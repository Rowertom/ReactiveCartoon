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

export const Header = () => {

    const handleAddContent = () => {
        console.log('Есть контакт')
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='header'>
            <div className='contain'>
                <div className='header__wrap'>
                    <div className='header__left'>
                        <Logo />
                        <Search />
                        <button className='btn_header' onClick={handleAddContent}>СОЗДАТЬ ПОСТ</button>
                    </div>
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
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}