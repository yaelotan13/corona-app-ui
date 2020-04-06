import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
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

const Spinner = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.center}>
            <CircularProgress />
        </Box>
    )
};

export default Spinner;