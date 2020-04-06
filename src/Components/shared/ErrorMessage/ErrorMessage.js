import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    center: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '5',
    }
});

const ErrorMessage = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.center}>
            <Typography>{props.t('fetching error')}</Typography>
        </Box>
    )
};

export default ErrorMessage;