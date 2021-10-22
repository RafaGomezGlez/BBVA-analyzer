import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from "@mui/material/Button";
import useStyles from './styles'; 
import MenuIcon from '@mui/icons-material/Menu';
function LeftBar() {
    const classes = useStyles();
    



    return (
        <div>
            <Button color="primary">{<MenuIcon />}</Button>
            {/* <Drawer
                anchor='right'
                open='true'
            >
            </Drawer> */}
        </div>
    )
}

export default LeftBar;
