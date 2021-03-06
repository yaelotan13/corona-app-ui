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
        backgroundColor: 'orange',
        fontSize: 24,
        textAligh: 'center',
    },
    item: {
        color: 'orange',
    },
    link: {
        textDecoration: 'none',
    }
}));

function getPath (str, t) {
    switch (str) {
      case t('home') : {
        return '/home';
      }
      case t('about us'): {
        return '/about-us';
      }
      case t('map'): {
        return '/map';
      }
      case t('survey'): {
        return '/survey';
      }
      case t('contact us'): {
        return '/contact-us';
      }
      default: {
        return '/home'
      }
    }
}

const SideDrawer = (props) => {
    const classes = useStyles();
    const listItems = [props.t('home'), props.t('about us'), props.t('map'), props.t('survey')];

    return (
        <Box> 
            {
                props.open ?
                <Drawer open={props.open} onClose={props.close}>
                    <Box className={classes.listContainer} onClick={props.close}>
                        <List className={classes.list}>
                            <ListItem className={classes.coronaHeadline} divider>
                                <ListItemText primary="CORONA HOT MAP" />
                            </ListItem>
                            {
                                listItems.map((text, index) => (
                                    <Link to={getPath(text, props.t)} className={classes.link}>
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