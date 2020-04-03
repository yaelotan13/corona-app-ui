import React from 'react';
import i18n from 'i18next';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    Box,
    Avatar,
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core';

import * as actions from '../../../store/actions/actions';
import englandFlag from '../../../assets/images/england.png';
import israelFlag from '../../../assets/images/israel.jpg';

const useStyles = makeStyles((theme) => ({
    formControl: {
        padding: 0,
        minWidth: 80,
        height: '100%',
        color: 'white',
    },
    flagsContainers: {
        width: '10vw',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    select: {
        color: 'white',
        '&::before': {
            borderBottom: 'none',
            content: '" "'
        },
        '&:hover': {
            transition: 'none',
        },
        '& svg': {
            color: 'white',
        }
    },
    languageFlag: {
        [theme.breakpoints.between('sm', 'xl')]: {
            height: '3vh',
            width: '2vw',
        },
        [theme.breakpoints.down('xs')]: {
            position: 'absolut',
            right: '3vw',
            height: '3vh',
            width: '5vw',
        }
    },
    languageName: {
        color: 'white',
    }
}));

const LanguageFlag = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const aboveXsScreen = useMediaQuery(theme.breakpoints.between('sm', 'xl'));

    const handleChange = (event) => {
        props.onLanChanged(event.target.value);
        
        const shortLan = event.target.value === 'English' ? 'en' : 'he';
        changeLanguage(shortLan);
      };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    return (
        <Box className={classes.flagsContainers}>
            {
                aboveXsScreen ?
                <FormControl className={classes.formControl}>
                    <Select value={props.lan} onChange={handleChange} displayEmpty className={classes.select}>
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="עברית">עברית</MenuItem>
                    </Select>
                </FormControl>
                :
                null
            }
            <Avatar src={props.lan === 'English' ? englandFlag : israelFlag} className={classes.languageFlag}></Avatar>
        </Box>
    );
};

const mapStateToProp = state => {
    return {
        lan: state.lan
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLanChanged: (lan) => dispatch(actions.changeLang(lan)),
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(withNamespaces()(LanguageFlag));
