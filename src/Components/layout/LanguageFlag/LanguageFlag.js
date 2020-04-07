import React from 'react';
import i18n from 'i18next';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
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
import russiaFlag from '../../../assets/images/russia-flag.png';
import portogalFlag from '../../../assets/images/portugal-flag.jpg';

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
        [theme.breakpoints.down('xs')]: {
            width: '30vw',
        }
    },
    select: {
        color: 'white',
        textAlign: 'center',
        '&::before': {
            borderBottom: 'none',
            content: '" "'
        },
        '& svg': {
            color: 'white',
        }
    },
    languageFlag: {
        position: 'static',
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

    const handleChange = (event) => {
        props.onLanChanged(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    const getFlag = (lan) => {
        switch (lan) {
            case 'English':
                return englandFlag;
            case 'Hebrew': 
                return israelFlag;
            case 'Portuguese':
                return portogalFlag;
            case 'Russian':
                return russiaFlag;
        }
    }

    return (
        <Box className={classes.flagsContainers}>
            <FormControl className={classes.formControl}>
                <Select value={props.lan} onChange={handleChange} displayEmpty className={classes.select}>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hebrew">עברית</MenuItem>
                    <MenuItem value="Portuguese">Portuguesa</MenuItem>
                    <MenuItem value="Russian">русский</MenuItem>
                </Select>
            </FormControl>
            <Avatar src={getFlag(props.lan)} className={classes.languageFlag}></Avatar>
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
