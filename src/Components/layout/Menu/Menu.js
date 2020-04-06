import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import {
    Toolbar,
    IconButton,
    AppBar,
    Box,
} from '@material-ui/core';

import { withNamespaces } from 'react-i18next';
import SideDrawer from '../Drawer/Drawer';
import LanguageFlag from '../LanguageFlag/LanguageFlag';

const useStyles = makeStyles((theme) => ({
    menu: {
        width: '100vw',
        position: 'fixed',
    },
    container: {
        dispaly: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.secondary.dark,
    },
    navigation: {
        display: 'flex',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    nav: {
        marginLeft: '2vw',
        cursor: 'pointer',
    },
}));

const Menu = (props) => {
    const classes = useStyles();
    const [ open, setOpen ] = useState(false);

    const toggleOpenDrower = () => {
        setOpen((prevState) => !prevState);
    }

    return (
        <Box>
            <AppBar position="static" className={classes.menu}>
                <Toolbar variant="dense" className={classes.container}>
                    <Box className={classes.navigation}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon onClick={toggleOpenDrower}/>
                            <SideDrawer open={open} close={toggleOpenDrower}/>
                        </IconButton>
                    </Box>
                    <LanguageFlag language="English"/>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default withNamespaces()(Menu);