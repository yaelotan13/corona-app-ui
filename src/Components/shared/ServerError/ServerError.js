import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withMenu from '../../../hoc/withMenu/withMenu';
import img from '../../../assets/images/clean.jpg'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    img: {
        height: '60vh',
        width: '50vw',
        backgroundImage: `url(${img})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            height: '40vh',
        }
    },
    content: {
        marginTop: '15vh',
        padding: '0 10vw'
    },
    header: {
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.typography.h2.fontSize
        }
    },
    rightToLeft: {
        textAlign: 'right'
    },
    text: {
        marginTop: '3vh',
        whiteSpace: 'pre-wrap',
        color: theme.palette.text.secondary,
        lineHeight: theme.typography.h3.lineHeight,
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.typography.h5.fontSize
        }
    },
    buttonContainer: {
        marginTop: '3vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
}));

const ServerError = ({ history, t, leftToRight }) => {
    const classes = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.content}>
                <Typography variant="h1" className={leftToRight ? classes.header : [classes.header, classes.rightToLeft].join(' ')}>{t('fetching error')}</Typography>
                <Typography variant="h4" className={leftToRight ?classes.text : [classes.text, classes.rightToLeft].join(' ')}>
                    {t('fetching error content')}
                </Typography>
                <Box className={classes.buttonContainer}>
                    <Button variant="contained" color="primary" onClick={() => history.push('/home')}>{t('go home')}</Button>
                </Box>
            </Box>
            <Box className={classes.img} />
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        leftToRight: state.leftToRight,
    }
}

export default connect(mapStateToProps)(withRouter(withMenu(ServerError)));