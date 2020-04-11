import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import img from '../../../assets/images/fight.jpg'

const useStyles = makeStyles((theme) => ({
    header: {
        height: '50vh',
        width: '100vw',
        backgroundImage: `url(${img})`,
        backgroundSize: '50%',
        backgroundPosition:'center',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.down('xs')]: {
            backgroundSize: '90%',
            height: '30vh',
        }
    },
    mainHeadline: {
        textAlign: 'center',
        marginBottom: 16,
      },
      headline: {
        textAlign: 'center',
        marginBottom: 30,
      },
}));

const Header = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.header}>
            <Typography className={classes.mainHeadline} variant="h3">
                {props.t('survey header')}
            </Typography>
            {/* <Typography className={classes.headline} variant="h5">
                {props.t('survey intro')}
            </Typography> */}
        </Box>
    );
};

export default Header;
