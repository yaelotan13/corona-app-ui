import React from 'react';
import { connect } from 'react-redux';
import i18n from '../../../i18n';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    ListItemAvatar,
    Avatar
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';
import RoomIcon from '@material-ui/icons/Room';
import * as actions from '../../../store/actions/actions';

import englandFlag from '../../../assets/images/england.png';
import israelFlag from '../../../assets/images/israel.jpg';

const useStyles = makeStyles((theme) => ({
    list: {
      width: 250,
      paddingTop: 0,
    },
    fullList: {
      width: 'auto',
    },
    listContainer: {
        width: '100%',
        height: '100vh',
    },
    coronaHeadline: {
        backgroundColor: 'grey',
        fontFamily: "'Teko', sans-serif';",
        fontSize: 24,
        textAligh: 'center',
    },
    headline: {
        fontFamily: "'Teko', sans-serif';",
        fontSize: 24,
    },
    item: {
        color: 'orange',
    },
    flagsContainers: {
        marginTop: '10vh',
        display: 'flex',
        flexDirection: 'column',
        height: '5vh',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        cursor: 'pointer',
    },
    flag: {
        [theme.breakpoints.between('sm', 'xl')]: {
            height: '3vh',
            width: '2vw',
          },
        [theme.breakpoints.down('xs')]: {
            height: '3vh',
            width: '5vw',
        }
    },
    link: {
        textDecoration: 'none',
    }
}));

function getPath(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toLowerCase() + splitStr[i].substring(1);     
    }

    return '/'.concat(splitStr.join('-')); 
 }

const SideDrawer = (props) => {
    const classes = useStyles();
    const listItems = ['Home', 'About Us', 'Map', 'Survey'];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        const language = lng === 'en' ? 'English' : 'Hebrew';
        props.onLanChanges(language);
    }
    console.log(`cur screen: ${props.screen}`)
    return (
        <Box> 
            {
                props.open ?
                <Drawer open={props.open} onClose={props.close}>
                    <Box className={classes.listContainer} onClick={props.close}>
                        <List className={classes.list}>
                            <ListItem className={classes.coronaHeadline} divider>
                                <ListItemText className={classes.headline} primary="CORONA HOT MAP"/>
                            </ListItem>
                            {
                                listItems.map((text, index) => (
                                    <Link to={getPath(text)} className={classes.link}>
                                        <ListItem 
                                            button 
                                            key={text} 
                                            selected={props.screen === text ? true : false} 
                                            divider={index === listItems.length - 1 ? true : false}
                                            onClick={() => props.onScreenChanged(text)}
                                        >
                                            <ListItemIcon>
                                                {
                                                    index === 0 ? <HomeIcon /> 
                                                    :
                                                    index === 1 ? <InfoIcon />
                                                    : 
                                                    index === 2 ? <RoomIcon />
                                                    :
                                                    <DescriptionIcon /> 
                                                }
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    </Link>
                                ))
                            }
                            <Box className={classes.flagsContainers}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={englandFlag} className={classes.flag} onClick={() => changeLanguage('en')} />
                                    </ListItemAvatar>
                                    <ListItemText className={classes.flag} onClick={() => changeLanguage('en')} primary="English" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={israelFlag} className={classes.flag} onClick={() => changeLanguage('he')} />
                                    </ListItemAvatar>
                                    <ListItemText className={classes.flag} onClick={() => changeLanguage('he')} primary="עברית" />
                                </ListItem>
                            </Box>
                        </List>
                    </Box>
                </Drawer>
                :
                null
            }
        </Box>
    );
};

const mapStataToProps = state => {
    return {
        lan: state.lan,
        screen: state.curScreen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onScreenChanged: (screen) => dispatch(actions.changeScreen(screen)),
        onLanChanges: (lan) => dispatch(actions.changeLang(lan))
    }
}

export default connect(mapStataToProps, mapDispatchToProps)(withNamespaces()(SideDrawer));